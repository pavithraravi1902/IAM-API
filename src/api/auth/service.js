import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../common/openid/jwt.js";
import { sendOTPByEmail } from "../../common/openid/otp.js";
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

// export const accessTokenService = async (req, res) => {
//   console.log(req.query, "reqqqqqqqq")
//   const code = req.query.code;
//   if (!code) {
//     throw new Error('Authorization code is missing.');
//   }
//   return code;
// };
// export const siginWithGoogleService = async (code) => {
//   try {
//     const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//       client_id:
//         "1043116758259-8ur9s3hp9j5g811kj07p8gin570pp499.apps.googleusercontent.com",
//       client_secret: "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",
//       redirect_uri: "http://localhost:4201/users/google/callback",
//       grant_type: "authorization_code",
//       code: code
//     });
//     const { access_token, id_token } = data;
//     console.log(access_token, "access_token");
//     const response = await axios.get(
//       "https://www.googleapis.com/oauth2/v1/userinfo",
//       {
//         headers: { Authorization: `Bearer ${access_token}` },
//       }
//     );
//     const userInfo = response.data;
//     return userInfo;
//   } catch (error) {
//     console.log("Failed to get profile data", error);
//     throw new Error("Failed to get profile data");
//   }
// };

export const loginService = async (req, res) => {
  console.log(req, "login req");
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
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
        user.token = token;
        sendOTPByEmail("pavithrar@bloomlync.com", 453213);
        resolve({ token: token, user: user });
      })(req);
    });
  } catch (error) {
    throw error;
  }
};
