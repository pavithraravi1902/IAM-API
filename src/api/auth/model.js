// import bcrypt from "bcrypt";
// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   username: { type: String, required: true },
//   email: {
//     type: String,
//     match: /^\S+@\S+\.\S+$/,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     sparse: true,
//   },
//   password: { type: String },
//   googleId: { type: String },
//   pictureUrl: String,
//   otp: String,
//   otpExpiration: Date,
//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   isActive: Boolean
// });

// userSchema.methods.hasPermissionForModule = function (moduleName) {
//   return canAccessModule(this.role, moduleName);
// };

// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// userSchema.methods.authenticate = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const User = mongoose.model("User", userSchema);

// const passwordResetSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     // index: true,
//   },
//   token: {
//     type: String,
//     unique: true,
//     index: true,
//     default: () => uid(64),
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: 3600,
//   },
// });

// passwordResetSchema.methods = {
//   view() {
//     return {
//       user: this.user.view(),
//       token: this.token,
//     };
//   },
// };

// export const PasswordReset = mongoose.model(
//   "PasswordReset",
//   passwordResetSchema
// );

// const activationTokenSchema = new Schema({
//   user: {
//     type: Schema.ObjectId,
//     ref: "User",
//     index: true,
//   },
//   token: {
//     type: String,
//     unique: true,
//     index: true,
//     default: () => uid(64),
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: 3600,
//   },
// });

// activationTokenSchema.methods = {
//   view() {
//     return {
//       user: this.user.view(),
//       token: this.token,
//     };
//   },
// };

// export const ActivationToken = mongoose.model(
//   "ActivationToken",
//   activationTokenSchema
// );

// export const activationTokenSchemaDef = ActivationToken.schema;


import bcrypt from "bcrypt";
import mongoose from "mongoose";
import pkg from "rand-token"; 
const { uid } = pkg;

const { Schema } = mongoose;

const generateUniqueToken = () => uid(64);

const viewToken = function () {
  return {
    user: this.user.view(),
    token: this.token,
  };
};

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
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isActive: { type: Boolean, default: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.authenticate = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.hasPermissionForModule = function (moduleName) {
  return canAccessModule(this.role, moduleName);
};

export const User = mongoose.model("User", userSchema);

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", index: true, required: true },
  token: { type: String, unique: true, index: true, default: generateUniqueToken },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

tokenSchema.methods.view = viewToken;
export const PasswordReset = mongoose.model("PasswordReset", tokenSchema);
export const ActivationToken = mongoose.model("ActivationToken", tokenSchema);
export const activationTokenSchemaDef = ActivationToken.schema;
export const passwordResetSchemaDef = PasswordReset.schema;
