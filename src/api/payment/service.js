// import Razorpay from "razorpay";
// import { Payment } from "./model.js";
// import crypto from "crypto";

// const razorPaySecretKey = "gPRG86NZn3wV7A7MGVNfnERS";
// const razorPayId = "rzp_test_bkFrzP8pjtrHDc";
// const webookURL = "https://userauthentication/webhook";
// const webookSecret = "userAuthWebBook";

// const razorpayPayment = new Razorpay({
//   key_id: razorPayId,
//   key_secret: razorPaySecretKey,
// });

// export const createPaymentService = async (paymentData) => {
//   const { amount, currency, receipt } = paymentData;
//   try {
//     const options = {
//       amount: amount,
//       currency: currency,
//       receipt: receipt,
//       payment_capture: 1,
//     };
//     const order = await razorpayPayment.orders.create(options);
//     const payment = new Payment({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//     });
//     await payment.save();
//     return payment;
//   } catch (error) {
//   }
// };

// export const verifySignature = async (
//   razorpay_order_id,
//   razorpay_payment_id,
//   razorpay_signature
// ) => {
//   const generatedSignature = crypto
//     .createHmac("sha256", razorPaySecretKey)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   return generatedSignature === razorpay_signature;
// };

// export const verifyPaymentService = async (paymentData) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     paymentData;
//   if (
//     !verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
//   ) {
//     throw new Error("Invalid signature");
//   }
//   try {
//     const payment = await razorpayPayment.payments.fetch(razorpay_payment_id);
//     if (payment.status !== "captured") {
//       throw new Error("Payment not successful");
//     }
//     await Payment.findOneAndUpdate(
//       { orderId: razorpay_order_id },
//       { status: "success" }
//     );
//     const updatedPayment = await Payment.findOne({
//       orderId: razorpay_order_id,
//     });
//     return { success: true, payment: updatedPayment };
//   } catch (error) {
//     throw new Error(error ? error : "Payment verification failed");
//   }
// };


import Razorpay from "razorpay";
import { Payment } from "./model.js";
import crypto from "crypto";

const razorPaySecretKey = "gPRG86NZn3wV7A7MGVNfnERS";
const razorPayId = "rzp_test_bkFrzP8pjtrHDc";
const webhookURL = "https://userauthentication/webhook";
const webhookSecret = "userAuthWebBook";

const razorpayPayment = new Razorpay({
  key_id: razorPayId,
  key_secret: razorPaySecretKey,
});

export const createPaymentService = async (paymentData) => {
  const { amount, currency, receipt, userId, customerName, customerEmail, customerPhone, additionalNotes, addressDetails, createdBy, updatedBy } = paymentData;
  try {
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
      payment_capture: 1,
    };
    const order = await razorpayPayment.orders.create(options);
    console.log(order, "order")
    const payment = new Payment({
      orderId: order.id,
      amount: amount,
      currency: order.currency,
      receiptNumber: order.receipt,
      userId: userId,
      paymentStatus: 'created',
      paymentAmount: order.amount,
      paymentMethod: 'razorpay',
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      transactionStatus: 'pending',
      transactionType: 'order',
      additionalNotes: additionalNotes,
      addressDetails: addressDetails,
      createdBy: createdBy,
      updatedBy: updatedBy,
    });
    await payment.save();
    return payment;
  } catch (error) {
    console
    throw new Error(error ? error : 'Failed to create payment');
  }
};

const verifySignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const generatedSignature = crypto
    .createHmac("sha256", razorPaySecretKey)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  return generatedSignature === razorpay_signature;
};

export const verifyPaymentService = async (paymentData) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
  if (!verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    throw new Error("Invalid signature");
  }
  try {
    const payment = await razorpayPayment.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      throw new Error("Payment not successful");
    }
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id},
      {
        paymentStatus: "success",
        paymentAmount: payment.amount / 100,
        paymentId: razorpay_payment_id,
        merchantId: "O8LM3jYcSIDTnv",
        paymentMethod: payment.method,
        paymentDate: payment.created_at,
        transactionId: payment.id,
        transactionStatus:"success",
        gatewayResponse: payment,
        updatedAt: new Date(),
      },
      { new: true }
    );
    const updatedPayment = await Payment.findOne({
      orderId: razorpay_order_id,
    });
    console.log(updatedPayment);
    return {success: true, payment: updatedPayment };
  } catch (error) {
    throw new Error(error ? error : "Payment verification failed");
  }
};

export const refundPaymentService = async (paymentData) => {
  const {paymentId, amount} = paymentData;
  try {
    const actualPayment = await Payment.findOne({ paymentId });
    if(!paymentId){
      throw new Error('Payment Id not found.')
    }
    if (amount !== actualPayment.paymentAmount / 100) {
      throw new Error('Refund amount does not match the original payment amount');
    }
    const refundAmount = amount * 100;
    const refund = await razorpayPayment.payments.refund(paymentId, { amount: refundAmount});
    console.log(refund, "refund")
    await Payment.findOneAndUpdate(
      { paymentId },
      { paymentStatus: "refunded", refundId: refund.id }
    );
    const updatedPayment = await Payment.findOne({ paymentId });
    return { success: true, refund: updatedPayment };
  } catch (error) {
    console.log(error);
    throw new Error(error ? error : "Refund failed");
  }
};
