import {
  createResetToken,
  verify
} from "../../common/openid/jwt.js";
import { generateOtp, sendEmail } from "../../common/openid/otp.js";
import passport from "../../common/openid/passport.js";
import { User } from "./model.js";

export const createUserService = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }
    const user = await User.create(userData);
    if (!user) {
      const error = new Error("Error while creating user");
      error.status = 400;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new Error(info.message));
        }
        const payload = {
          userId: user.id,
          email: user.email,
        };
        const token = createResetToken(payload);
        user.token = token;
        resolve({ token: token, user: user });
      })(req);
    });
  } catch (error) {
    throw error;
  }
};

export const sendOTPByEmailService = async (email) => {
  const generatedOtp = generateOtp();
  const expirationTimeMs = 5 * 60 * 1000;
  const expirationTimestamp = Date.now() + expirationTimeMs;
  const mailInfo = {
    email: email,
    subject: "Your OTP for MFA",
    content: `Your OTP is: ${generatedOtp}. This OTP is valid for 1 minute. Please use it before ${expirationTimestamp}.`,
  };
  const isSent = await sendEmail(mailInfo);
  if (isSent) {
    try {
      await User.findOneAndUpdate(
        { email: email },
        { otp: generatedOtp, otpExpiration: expirationTimestamp }
      );
    } catch (error) {
      throw new Error(error ? error : "Failed to send OTP.");
    }
  }
};

export const verifyOtpService = async (email, userOtp) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user || !user.otp || !user.otpExpiration) {
      throw new Error("OTP not found or expired for the user");
    }
    if (Date.now() > user.otpExpiration) {
      throw new Error("OTP has expired");
    }
    if (user.otp === userOtp) {
      return "OTP verified successfully";
    } else {
      throw new Error("Invalid OTP. Please try again.");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const forgotPasswordService = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const token = await createResetToken(user._id);
    const result = { token };
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpiration: expirationTime,
        },
      },
      { new: true }
    );
    const resetUrl = `https://localhost:3000/reset-password?token=${token}`;
    const mailInfo = {
      email: email,
      subject: `Password Update`,
      content: `Update your password through ${resetUrl}`,
    };
    await sendEmail(mailInfo);
    return result;
  } catch (error) {
    console.error("Error in forgotPasswordService:", error);
    throw error;
  }
};

export const resetPasswordService = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(newPassword, "newPassword")
    user.password = newPassword;
    const results = await user.save();

    const result = await User.findOneAndUpdate(
      {
        password: newPassword,
      },
      { new: true }
    );
    console.log(results, "result")
    console.log(result, "result")
    if(!results){
      throw new Error("Failed to update password")
    }
    return { success: true, message: "Password reset successfully", results };
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw new Error("Failed to reset password");
  }
};

export const verifyResetTokenService = async (token) => {
  try {
    if (!token) {
      throw new Error("JWT token must be provided");
    }
    const decoded = await verify(token);
    const email = decoded.email;
    const resetPassword = await User.findOne({
      resetPasswordToken: token,
    });
    if (!resetPassword) {
      throw new Error("Invalid or expired reset token");
    }
    return "Verified Successfully";
  } catch (error) {
    throw new Error(error);
  }
};
