import { sign, verify } from "../../common/openid/jwt.js";
import {
  generateOTPURI,
  generateQRCode,
  generateSecret,
} from "../../common/openid/mfa.js";
import { generateOtp, sendEmail } from "../../common/openid/otp.js";
import googlePassport from "../../common/passport/google.js";
import localPassport from "../../common/passport/local.js";
import { ActivationToken, User } from "./model.js";

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
      const error = new Error("User Resigration Failed");
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
      const { email, password, googleId } = req.body;

      if (googleId) {
        googlePassport.authenticate("google", async (err, user, info) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject(
              new Error(info.message || "Google authentication failed")
            );
          }
          const token = await sign(user.id);
          const activationToken = new ActivationToken({
            user: user._id,
            token: token,
          });
          await activationToken.save();
          resolve({ token: token, user: user });
        })(req, res);
      } else {
        localPassport.authenticate("local", async (err, user, info) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject(
              new Error(info.message || "Incorrect email or password")
            );
          }
          const token = await sign(user.id);
          const activationToken = new ActivationToken({
            user: user._id,
            token: token,
          });
          await activationToken.save();
          resolve({ token: token, user: user });
        })(req, res);
      }
    });
  } catch (error) {
    throw error ? error : "Login Failed";
  }
};

export const getUsersService = async () => {
  try {
    const user = await User.find();
    if (!user) {
      const error = new Error("User data not found");
      error.status = 400;
      throw error;
    }
    return user;
  } catch (error) {
    throw error ? error : "Failed to fetch user data";
  }
};

export const sendOTPByEmailService = async (email) => {
  const generatedOtp = generateOtp();
  const expirationTimeMs = 60 * 1000;
  const expirationTimestamp = Date.now() + expirationTimeMs;

  const mailInfo = {
    to: email,
    subject: "Auth Nexus Verification",
    text: `Your OTP is: ${generatedOtp}. This OTP is valid for 1 minute.`,
  };

  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 400;
    throw error;
  }

  let isSent = false;
  try {
    isSent = await sendEmail(mailInfo);
  } catch (error) {
    throw new Error("Failed to send OTP.");
  }

  if (isSent) {
    try {
      await User.findOneAndUpdate(
        { email: email },
        { otp: generatedOtp, otpExpiration: expirationTimestamp }
      );
    } catch (error) {
      throw new Error("Failed to update user with OTP.");
    }
  }
};

export const verifyEmailOtpService = async (email, userOtp) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    if (!user || !user.otp || !user.otpExpiration) {
      throw new Error("OTP not found");
    }
    if (Date.now() > user.otpExpiration) {
      throw new Error("OTP has expired");
    }
    const otpExpirationDuration = 60 * 1000;
    const otpCreationTime = user.otpExpiration - otpExpirationDuration;
    if (otpCreationTime > Date.now()) {
      throw new Error("OTP validity duration exceeded (1 minute)");
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

export const verifyMobileOtpService = async (email, userOtp) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    if (!user || !user.otp || !user.otpExpiration) {
      throw new Error("OTP not found");
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
    const token = await sign(user.id);
    const activationToken = new ActivationToken({
      user: user._id,
      token: token,
    });
    await activationToken.save();
    const resetUrl = `http://localhost:3001/reset-password?token=${token}`;
    const mailInfo = {
      to: email,
      subject: `AuthNexus Password Update`,
      text: `Update your password through ${resetUrl}`,
    };
    await sendEmail(mailInfo);
    return token;
  } catch (error) {
    console.error("Error in forgotPasswordService:", error);
    throw error ? error : "Internal Error";
  }
};

export const resetPasswordService = async (token, password) => {
  console.log(token, password);
  try {
    const activationToken = await ActivationToken.findOne({ token });
    if (!activationToken) {
      throw new Error("Invalid token");
    }

    const user = await User.findById(activationToken.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    user.password = password;
    const result = await user.save();
    if (!result) {
      throw new Error("Failed to update password");
    }
    await ActivationToken.deleteOne({ token });
    return { success: true, message: "Password reset successfully", result };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Failed to reset password");
  }
};

export const verifyResetTokenService = async (token) => {
  try {
    if (!token) {
      throw new Error("JWT token must be provideds");
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

export const searchUsersService = async (queryParams) => {
  try {
    const {
      username,
      email,
      role,
      isActive,
      page = 1,
      limit = 10,
    } = queryParams;

    const filter = {};

    if (username) {
      filter.username = new RegExp(username, "i");
    }

    if (email) {
      filter.email = new RegExp(email, "i");
    }

    if (role) {
      filter.role = role;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    console.log("Filter object:", filter);

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const users = await User.paginate(filter, options);

    return users;
  } catch (error) {
    console.log(error);
    throw { message: error.message || "Error retrieving users", status: 500 };
  }
};

export const setupAuthenticatorTotpService = async (email) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const secret = generateSecret();
    const otpURI = generateOTPURI(secret, email);
    const qrCode = await generateQRCode(otpURI);

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          "mfa.secret": secret,
          "mfa.otpURI": otpURI,
          "mfa.qrCode": qrCode,
        },
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return { secret, otpURI, qrCode };
  } catch (error) {
    throw new Error(error ? error : "Error generating OTP setup");
  }
};

export const setSecurityQuestionsService = async (
  userId,
  securityQuestions
) => {
  try {
    const existingRecord = await User.findOne({ userId });
    if (existingRecord) {
      // Update existing record
      existingRecord.securityQuestions = securityQuestions;
      await existingRecord.save();
      return { message: "Security questions updated successfully" };
    } else {
      // Create new record
      const newRecord = new UserSecurityQuestions({
        userId,
        securityQuestions,
      });
      await newRecord.save();
      return { message: "Security questions set successfully" };
    }
  } catch (error) {
    throw error;
  }
};

export const verifySecurityQuestionsService = async (userId, securityQuestions) => {
  try {
    const userRecord = await User.findOne({ userId });
    if (!userRecord) {
      throw new Error("User not found");
    }
    if (!userRecord.securityQuestions || userRecord.securityQuestions.length !== securityQuestions.length) {
      throw new Error("Security questions not set or mismatch in number of questions");
    }
    for (const sq of securityQuestions) {
      const userQuestion = userRecord.securityQuestions.find(
        (q) => q.questionKey === sq.questionKey
      );
      if (!userQuestion || userQuestion.answer !== sq.answer) {
        throw new Error("Security question verification failed");
      }
    }
    return { message: "Security questions verified successfully" };
  } catch (error) {
    throw error;
  }
};