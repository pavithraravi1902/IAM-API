import { ProfileSchema } from "./model.js";

export const createProfileService = async (profileData) => {
  try {
    const existingUser = await ProfileSchema.findOne({
      profileData: profileData.email,
    });
    if (existingUser) {
      throw new Error("User already exist.");
    }
    const user = ProfileSchema.create(profileData);
    return user;
  } catch (err) {
    throw new Error(err ? err : "Failed to create profile data");
  }
};

export const updateProfileService = async (profileData) => {
  try {
    const user = await ProfileSchema.findOne({
      profileData: userData.email,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const updateUser = await ProfileSchema.findOneAndUpdate(
      { email: email },
      profileData
    );
    return updateUser;
  } catch (err) {
    new Error(err ? err : "Profile Updated!");
  }
};
