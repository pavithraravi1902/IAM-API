import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema({
  userId: String,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  DOB: Date,
  mobileNumber: Number,
  email: String,
});

export const ProfileSchema = mongoose.model("ProfileSchema", profileSchema);
