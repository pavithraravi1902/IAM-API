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

export const loginService = async (req) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (!user) {
          console.log(info.message);
          return reject(new Error(info.message));
        }
        resolve(user);
      })(req);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

