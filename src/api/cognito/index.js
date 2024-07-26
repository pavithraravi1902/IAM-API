import express from "express";
import {
  cognitoConfirmPasswordReset,
  cognitoConfirmSignUp,
  cognitoInitiatePasswordReset,
  cognitoSignIn,
  cognitoSignUp,
} from "./controller.js";
const router = express.Router();

router.post("/signup", cognitoSignUp);
router.post("/confirm-signup", cognitoConfirmSignUp);
router.post("/signin", cognitoSignIn);
router.post("/initiate-password-reset", cognitoInitiatePasswordReset);
router.post("/confirm-password-reset", cognitoConfirmPasswordReset);

export default router;
