import UserPool from "./model.js";

export const createUserPoolService = async (userPoolData) => {
  console.log(userPoolData.users, "userPoolData");
  try {
    const newUser = await UserPool.create({
      ...userPoolData,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const listUsersFromUserPoolService = async (poolId) => {
  try {
    const userPool = await UserPool.findById({ _id: poolId }).populate("users");
    if (!userPool) {
      throw new Error("User pool not found");
    }
    const users = userPool.users;
    return users;
  } catch (error) {
    throw new Error("Failed to fetch user pool");
  }
};

export const getUserPoolByUserIdService = async (userId, poolId) => {
  console.log(userId, poolId);
  try {
    const userPool = await UserPool.findById(poolId);
    console.log(userPool, "userPool");
    if (!userPool) {
      throw new Error("User pool not found.");
    }
    const user = userPool.users.find((user) => user._id.toString() === userId);
    if (!user) {
      throw new Error("User not found in the specified user pool.");
    }
    console.log(user, "user");
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error.message);
    throw error;
  }
};

export const updateUserDetailsByUserIdService = async (
  userId,
  poolId,
  userPoolData
) => {
  try {
    console.log(userId, poolId);
    const userPool = await UserPool.findOne({
      _id: "66bb59b8f722654c90707631",
    });
    console.log(userPool, "userPool");
    if (!userPool) {
      throw new Error("User pool not found.");
    }
    console.log(userId, poolId);
    const user = userPool.users.find(
      (user) => user._id.toString() === "66bb59b8f722654c90707632"
    );
    console.log(user, "user console");
    if (user) {
      Object.assign(user, userPoolData);
      await userPool.save();
    } else {
      throw new Error("User not found in the specified user pool.");
    }
    console.log(user, "user");
    return user;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};
