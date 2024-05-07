import bcrypt from "bcrypt";
import mongoose from "mongoose";
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
  googleId: { type: String },
  pictureUrl: String,
  otp: String,
  otpExpiration: Date,
  resetPasswordToken: String,
  resetPasswordExpiration: Date,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.methods.hasPermissionForModule = function (moduleName) {
  return canAccessModule(this.role, moduleName);
};

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
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

const passwordResetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // index: true,
  },
  token: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(64),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

passwordResetSchema.methods = {
  view() {
    return {
      user: this.user.view(),
      token: this.token,
    };
  },
};

export const PasswordReset = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);

const activationTokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    index: true,
  },
  token: {
    type: String,
    unique: true,
    index: true,
    default: () => uid(64),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

activationTokenSchema.methods = {
  view() {
    return {
      user: this.user.view(),
      token: this.token,
    };
  },
};

export const ActivationToken = mongoose.model(
  "ActivationToken",
  activationTokenSchema
);

export const activationTokenSchemaDef = ActivationToken.schema;
