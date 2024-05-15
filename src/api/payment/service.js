import Razorpay from "razorpay";
import { Payment } from "./model.js";
import crypto from "crypto";

const razorPaySecretKey = "gPRG86NZn3wV7A7MGVNfnERS";
const razorPayId = "rzp_test_bkFrzP8pjtrHDc";
const webookURL = "https://userauthentication/webhook";
const webookSecret = "userAuthWebBook";

const razorpayPayment = new Razorpay({
  key_id: razorPayId,
  key_secret: razorPaySecretKey,
});

export const createPaymentService = async (paymentData) => {
  const { amount, currency, receipt } = paymentData;
  try {
    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
      payment_capture: 1,
    };
    const order = await razorpayPayment.orders.create(options);
    const payment = new Payment({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
    await payment.save();
    return payment;
  } catch (error) {
    console.log(error);
  }
};

export const verifySignature = async (
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
    console.log(payment, "payment");
    if (payment.status !== "captured") {
      throw new Error("Payment not successful");
    }
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "success" }
    );
    const updatedPayment = await Payment.findOne({
      orderId: razorpay_order_id,
    });
    return { success: true, payment: updatedPayment };
  } catch (error) {
    throw new Error(error ? error : "Payment verification failed");
  }
};
