import express from "express";
import { createPayment, verifyPayment } from "./controller.js";
const router = express.Router();

router.post('/order', createPayment);

router.post('/verify-payment', verifyPayment);

export default router;