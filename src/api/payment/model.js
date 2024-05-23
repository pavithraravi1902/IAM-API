import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  amount: { type: Number },
  currency: { type: String },
  userId: { type: String },
  merchantId: { type: String },
  paymentId: { type: String},
  paymentStatus: {
    type: String,
  },
  paymentAmount: { type: Number },
  refundId:{type: String},
  refundAmount: {type: Number},
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  additionalNotes: { type: String },
  addressDetails: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
});

export const Payment = mongoose.model("Payment", paymentSchema);
