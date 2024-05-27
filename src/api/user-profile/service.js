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

export const getUserProfileByIdService = async (params) => {
  console.log(params, "incoming params")
  const userId = params.userId;
  try {
    if (!userId) {
      throw new Error("Invalid params");
    }
    const user = ProfileSchema.findOne({ userId: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserByIdService = async (params) => {
  try {
    const userId = params;
    if (!userId) {
      throw new Error("Invalid params");
    }
    const user = ProfileSchema.findById({ userId: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const removeProfile = ProfileSchema.findOneAndDelete({ userId: userId });
    if (!removeProfile) {
      throw new Error("Failed to delete user profile");
    }
    return removeProfile;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUserService = async () => {
  try {
    const user = ProfileSchema.find();
    if (!user) {
      throw new Error("Failed to retireve user profile data");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProfileService = async (params, body) => {
  const userId = params.userId;
  try {
    const user = await ProfileSchema.findOne({
      userId: userId,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const updateUser = await ProfileSchema.findOneAndUpdate(
      { userId: userId },
      body
    );
    return updateUser;
  } catch (err) {
    new Error(err ? err : "Profile Updated!");
  }
};
