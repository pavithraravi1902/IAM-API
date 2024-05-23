import express from "express";
import { createPayment, processRefund, refundPayment, verifyPayment } from "./controller.js";
const router = express.Router();

router.post('/order', createPayment);

router.post('/verify-payment', verifyPayment);

router.post('/refund', refundPayment);

router.post('/partial-refund', processRefund);

export default router;