// import {
//   createUserService,
//   forgotPasswordService,
//   getUsersService,
//   loginService,
//   resetPasswordService,
//   sendOTPByEmailService,
//   verifyEmailOtpService,
//   verifyResetTokenService,
// } from "./service.js";

// export const createUser = (req, res) => {
//   createUserService(req.body)
//     .then((user) => {
//       res.status(200).json({ message: "User created successfully", user });
//     })
//     .catch((error) => {
//       res
//         .status(error.status || 500)
//         .json({ message: error.message || "Internal server error" });
//     });
// };

// export const login = async (req, res) => {
//   try {
//     const user = await loginService(req);
//     res.status(200).json({ message: "User login successfully", user });
//   } catch (error) {
//     res
//       .status(error.status || 401)
//       .json({ message: error.message || "Authentication failed" });
//   }
// };

// export const getUsers = (req, res) => {
//   getUsersService()
//     .then((user) => {
//       res.status(200).json({ message: "Existing Users", user });
//     })
//     .catch((error) => {
//       res
//         .status(error.status || 500)
//         .json({ message: error.message || "Internal server error" });
//     });
// };

// export const sendOtpByEmail = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await sendOTPByEmailService(email);
//     res.status(200).json({ message: "OTP Sent to the Email successfully" });
//   } catch (error) {
//     res
//       .status(error.status || 401)
//       .json({ message: error.message || "Invalid" });
//   }
// };

// export const verifyEmailOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const verify = await verifyEmailOtpService(email, otp);
//     res.status(200).json({ message: verify });
//   } catch (error) {
//     res
//       .status(error.status || 401)
//       .json({ message: error.message || "OTP verification failed" });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await forgotPasswordService(email);
//     res.status(200).json({ message: user });
//   } catch (error) {
//     res
//       .status(error.status || 400)
//       .json({ message: error.message || "Internal Server Error" });
//   }
// };

// export const verifyResetToken = async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = await verifyResetTokenService(token);
//     res.status(200).json({ message: user });
//   } catch (error) {
//     res
//       .status(error.status || 400)
//       .json({ message: error.message || "Invalid token" });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { token, password } = req.body;
//   try {
//     const user = await resetPasswordService(token, password);
//     res.status(200).json({ message: user });
//   } catch (error) {
//     res
//       .status(error.status || 400)
//       .json({ message: error.message || "Failed to update Password" });
//   }
// };


import { handleResponse } from "../../common/response/response.js";
import {
  createUserService,
  forgotPasswordService,
  getUsersService,
  loginService,
  resetPasswordService,
  sendOTPByEmailService,
  verifyEmailOtpService,
  verifyResetTokenService,
} from "./service.js";

export const createUser = (req, res) => {
  handleResponse(
    createUserService(req.body),
    res,
    "User created successfully"
  );
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

export const getUsers = (req, res) => {
  handleResponse(
    getUsersService(),
    res,
    "Existing Users"
  );
};

export const sendOtpByEmail = async (req, res) => {
  const { email } = req.body;
  handleResponse(
    sendOTPByEmailService(email),
    res,
    "OTP Sent to the Email successfully",
    "Invalid",
    200,
    401
  );
};

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  handleResponse(
    verifyEmailOtpService(email, otp),
    res,
    "OTP verification successful",
    "OTP verification failed",
    200,
    401
  );
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  handleResponse(
    forgotPasswordService(email),
    res,
    "Password reset email sent",
    "Internal Server Error",
    200,
    400
  );
};

export const verifyResetToken = async (req, res) => {
  const { token } = req.body;
  handleResponse(
    verifyResetTokenService(token),
    res,
    "Token verified",
    "Invalid token",
    200,
    400
  );
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  handleResponse(
    resetPasswordService(token, password),
    res,
    "Password updated successfully",
    "Failed to update Password",
    200,
    400
  );
};
