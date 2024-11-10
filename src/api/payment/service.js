import crypto from "crypto";
import Razorpay from "razorpay";
import { Payment } from "./model.js";

//mahesh
// const razorPayId = 'rzp_test_nLdVp2LWvwUtaL'
// const razorPaySecretKey = 'r1X4K6n7qGnjDA52P8uAkA2e'
//pavithra
const razorPaySecretKey = "gPRG86NZn3wV7A7MGVNfnERS";
const razorPayId = "rzp_test_bkFrzP8pjtrHDc";
const webhookURL = "https://userauthentication/webhook";
const webhookSecret = "userAuthWebBook";

const razorpayPayment = new Razorpay({
  key_id: razorPayId,
  key_secret: razorPaySecretKey,
});

export const createPaymentService = async (paymentData) => {
  const {
    amount,
    currency,
    receipt,
    userId,
    customerName,
    customerEmail,
    customerPhone,
    additionalNotes,
    addressDetails,
    createdBy,
    updatedBy,
  } = paymentData;
  try {
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
      payment_capture: 1,
    };
    const order = await razorpayPayment.orders.create(options);
    const payment = new Payment({
      orderId: order.id,
      amount: amount,
      currency: order.currency,
      userId: userId,
      paymentStatus: "created",
      paymentAmount: order.amount,
      paymentMethod: "razorpay",
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      transactionStatus: "pending",
      transactionType: "order",
      additionalNotes: additionalNotes,
      addressDetails: addressDetails,
      createdBy: createdBy,
      updatedBy: updatedBy,
    });
    await payment.save();
    return payment;
  } catch (error) {
    throw new Error(error ? error : "Failed to create payment");
  }
};

const verifySignature = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  const generatedSignature = crypto
    .createHmac("sha256", razorPaySecretKey)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  return generatedSignature === razorpay_signature;
};

export const verifyPaymentService = async (paymentData) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    paymentData;
  if (
    !verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
  ) {
    throw new Error("Invalid signature");
  }
  try {
    const payment = await razorpayPayment.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      throw new Error("Payment not successful");
    }
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentStatus: "success",
        paymentAmount: payment.amount / 100,
        paymentId: razorpay_payment_id,
        merchantId: "O8LM3jYcSIDTnv",
        paymentMethod: payment.method,
        paymentDate: payment.created_at,
        updatedAt: new Date(),
      },
      { new: true }
    );
    const updatedPayment = await Payment.findOne({
      orderId: razorpay_order_id,
    });
    return { success: true, payment: updatedPayment };
  } catch (error) {
    throw new Error(error ? error : "Payment verification failed");
  }
};

export const calculatePartialRefundAmount = (
  paymentAmount,
  refundPercentage
) => {
  return Math.floor((paymentAmount * refundPercentage) / 100);
};

export const refundPaymentService = async (paymentData) => {
  const { paymentId } = paymentData;
  try {
    const actualPayment = await Payment.findOne({ paymentId });
    if (!paymentId) {
      throw new Error("Payment Id not found.");
    }
    const amount = actualPayment.paymentAmount;
    const refundAmount = amount * 100;
    const refund = await razorpayPayment.payments.refund(paymentId, {
      amount: refundAmount,
      speed: "optimum",
    });
    const paiseAmt = refund.amount / 100;
    await Payment.findOneAndUpdate(
      { paymentId },
      { paymentStatus: "refunded", refundId: refund.id, refundAmount: paiseAmt }
    );
    const updatedPayment = await Payment.findOne({ paymentId });
    return { success: true, refund: updatedPayment };
  } catch (error) {
    console.log(error);
    throw new Error(error ? error.error.description : "Refund failed");
  }
};

export const partialRefundService = async (paymentId, refundAmount) => {
  const amtInPaise = refundAmount * 100;
  try {
    const refund = await razorpayPayment.payments.refund(paymentId, {
      amount: amtInPaise,
    });
    console.log("Refund successful:", refund);
    return refund;
  } catch (error) {
    console.error("Error creating refund:", error);
    throw error;
  }
};

export const processRefundService = async (paymentData) => {
  const { paymentId, paymentAmount, refundPercentage } = paymentData;
  const refundAmount = calculatePartialRefundAmount(
    paymentAmount,
    refundPercentage
  );
  console.log(
    `Refunding ${refundPercentage}% of ${paymentAmount} which is ${refundAmount}`
  );
  const refund = await partialRefundService(paymentId, refundAmount);
  console.log("Refund processed:", refund);
};
