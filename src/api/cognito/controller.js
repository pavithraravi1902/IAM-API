import {
  cognitoConfirmPasswordResetService,
  cognitoConfirmSignUpService,
  cognitoInitiatePasswordResetService,
  cognitoSignInService,
  cognitoSignUpService,
} from "./service.js";

export const cognitoSignUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const data = await cognitoSignUpService(username, password, email);
    res.status(200).json({ message: "Sign up successful", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing up: ${err.message}` });
  }
};

export const cognitoConfirmSignUp = async (req, res) => {
  const { username, code } = req.body;
  try {
    const data = await cognitoConfirmSignUpService(username, code);
    res.status(200).json({ message: "Confirmation successful", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error confirming sign up: ${err.message}` });
  }
};

export const cognitoSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await cognitoSignInService(username, password);
    res.status(200).json({ message: "Sign in successful", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing in: ${err.message}` });
  }
};

export const cognitoInitiatePasswordReset = async (req, res) => {
  const { username } = req.body;
  try {
    const data = await cognitoInitiatePasswordResetService(username);
    res.status(200).json({ message: "Password reset initiated", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error initiating password reset: ${err.message}` });
  }
};

export const cognitoConfirmPasswordReset = async (req, res) => {
  const { username, code, newPassword } = req.body;
  try {
    const data = await cognitoConfirmPasswordResetService(
      username,
      code,
      newPassword
    );
    res.status(200).json({ message: "Password reset confirmed", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error confirming password reset: ${err.message}` });
  }
};
