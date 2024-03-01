import { User } from "./model";

export const createUserService = async (body) => {
  try {
    const user = await User.create(body);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "Error while creating user";
      throw error;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

