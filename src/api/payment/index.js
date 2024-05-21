import express from "express";
import { createPayment, refundPayment, verifyPayment } from "./controller.js";
const router = express.Router();

router.post('/order', createPayment);

router.post('/verify-payment', verifyPayment);

router.post('/refund-payment', refundPayment);

export default router;