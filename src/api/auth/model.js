import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    sparse: true,
  },
  password: { type: String },
  googleId: { type: String, unique: true }, 
  pictureUrl: String
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.authenticate = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export const User = mongoose.model("User", userSchema);

