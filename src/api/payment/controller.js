import { createPaymentService, partialRefundService, refundPaymentService, verifyPaymentService } from "./service.js";

export const createPayment = (req, res) => {
  createPaymentService(req.body)
    .then((result) => {
      res.status(200).json({ message: "Successful payment", result });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Payment Failed" });
    });
};

export const verifyPayment = (req, res) => {
  verifyPaymentService(req.body)
    .then((result) => {
      res.status(200).json({ message: "Successful payment", result });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Payment Failed" });
    });
};

export const refundPayment = (req, res) => {
  refundPaymentService(req.body)
    .then((result) => {
      res.status(200).json({ message: "Successful Refund", result });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Refund Failed" });
    });
};

export const processRefund = (req, res) => {
  partialRefundService(req.body)
    .then((result) => {
      res.status(200).json({ message: "Successful Refund", result });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Refund Failed" });
    });
};