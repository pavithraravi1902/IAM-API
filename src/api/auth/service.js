import { User } from "./model.js";
import passport from 'passport';
const authenticate = passport;
import { Strategy as LocalStrategy } from "passport-local";
import configurePassport from "../../common/openid/passport.js";

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

export const loginService = (req, res, next) => {
  passport.authenticate('oidc', async (err, user, info) => {
    try {
      if (err) {
        throw new Error('Authentication error');
      }
      if (!user) {
        throw new Error('Authentication failed');
      }
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        throw new Error('User not found');
      }
      res.status(200).json({ message: 'Login successful', user: existingUser });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  })(req, res, next);
};

// export const loginService = async (userData) => {
//   console.log(userData);
//   try {
//     const user = await User.findOne({ email: userData.email });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const isPasswordValid = await user.authenticate(userData.password);
//     if (!isPasswordValid) {
//       throw new Error("Enter Correct Password");
//     }
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };
