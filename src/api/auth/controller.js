import {
  createUserService,
  forgotPasswordService,
  getUsersService,
  loginService,
  resetPasswordService,
  searchUsersService,
  sendOTPByEmailService,
  setSecurityQuestionsService,
  setupAuthenticatorTotpService,
  verifyEmailOtpService,
  verifyResetTokenService,
  verifySecurityQuestionsService,
} from "./service.js";

export const createUser = (req, res) => {
  createUserService(req.body)
    .then((user) => {
      res.status(200).json({ message: "User created successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};

export const login = async (req, res) => {
  try {
    const user = await loginService(req);
    res.status(200).json({ message: "User login successfully", user });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Authentication failed" });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const user = await createAdminUserService(req);
    res.status(200).json({ message: "User login successfully", user });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Authentication failed" });
  }
};


export const getUsers = (req, res) => {
  getUsersService()
    .then((user) => {
      res.status(200).json({ message: "Existing Users", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};

export const sendOtpByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await sendOTPByEmailService(email);
    res.status(200).json({ message: "OTP Sent to the Email successfully" });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Invalid" });
  }
};

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const verify = await verifyEmailOtpService(email, otp);
    res.status(200).json({ message: verify });
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "OTP verification failed" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await forgotPasswordService(email);
    res.status(200).json({ message: user });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const verifyResetToken = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await verifyResetTokenService(token);
    res.status(200).json({ message: user });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Invalid token" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await resetPasswordService(token, password);
    res.status(200).json({ message: user });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message || "Failed to update Password" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const users = await searchUsersService(req.query);
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const setupAuthenticatorTotp = async (req, res) => {
  console.log(req);
  const { email } = req.query;
  try {
    const mfa = await setupAuthenticatorTotpService(email);
    res.status(200).json({ qrCodeUrl: mfa });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to get QR code" });
  }
};

export const setSecurityQuestions = async (req, res) => {
  try {
    const userId = req.user._id; 
    const securityQuestions = req.body.securityQuestions;

    const response = await setSecurityQuestionsService(userId, securityQuestions);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const verifySecurityQuestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const securityQuestions = req.body.securityQuestions;

    const response = await verifySecurityQuestionsService(userId, securityQuestions);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

