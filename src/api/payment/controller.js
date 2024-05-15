import { createPaymentService, verifyPaymentService } from "./service.js";

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

