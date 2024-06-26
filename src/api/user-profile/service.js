import { ProfileSchema } from "./model.js";

export const createProfileService = async (profileData) => {
  try {
    const existingUser = await ProfileSchema.findOne({
      profileData: profileData.email,
    });
    const existingUserId = await ProfileSchema.findOne({
      profileData: profileData.userId,
    });
    if (existingUser || existingUserId) {
      throw new Error("User already exist.");
    }
    const user = ProfileSchema.create(profileData);
    return user;
  } catch (err) {
    console.log(err);
    if (err.name === "MongoError") {
      throw new Error("Email or UserId already exists.");
    } else {
      throw new Error("Failed to create user profile");
    }
  }
};

export const getUserProfileByIdService = async (userId) => {
  console.log(userId);
  try {
    if (!userId) {
      throw new Error("Invalid params");
    }
    const user = ProfileSchema.findOne(userId);
    console.log(user, "user");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
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

export const updateProfileService = async (params) => {
  const userId = params.userId;
  console.log(params);
  try {
    const user = await ProfileSchema.findOne({
      userId: userId,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const updateUser = await ProfileSchema.findOneAndUpdate(
      { userId: userId },
      params
    );
    console.log(updateUser);
    return updateUser;
  } catch (err) {
    new Error(err ? err : "Profile Updated!");
  }
};

export const searchUserProfileService = async (queryParams) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      mobileNumber,
      email,
      isActive,
      page = 1,
      limit = 10,
    } = queryParams;

    const filter = {};

    if (firstName) {
      filter.firstName = new RegExp(firstName, "i");
    }

    if (lastName) {
      filter.lastName = new RegExp(lastName, "i");
    }

    if (email) {
      filter.email = new RegExp(email, "i");
    }

    if (dob) {
      filter.dob = new RegExp(dob, "i");
    }

    if (mobileNumber) {
      filter.mobileNumber = new RegExp(mobileNumber, "i");
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const users = await ProfileSchema.paginate(filter, options);

    return users;
  } catch (error) {
    console.log(error);
    throw { message: error.message || "Error retrieving users", status: 500 };
  }
};
