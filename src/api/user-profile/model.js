import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema({
  profilePhoto: {
    type: Object,
    required: false,
  },
  userId: { type: String, required: true, unique: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: String,
  mobileNumber: String,
  email: { type: String, required: true, unique: true},
  isActive: Boolean
});

export const ProfileSchema = mongoose.model("ProfileSchema", profileSchema);
