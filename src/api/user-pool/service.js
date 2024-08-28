import mongoose from "mongoose";
const { Schema } = mongoose;
import UserPool from "./model.js";

/***********    User Pool Management     ******** */
export const createUserPoolService = async (userPoolData) => {
  try {
    const newUserPool = new UserPool(userPoolData);
    await newUserPool.save();

    return {
      success: true,
      message: "User pool created successfully",
      userPool: newUserPool,
    };
  } catch (error) {
    console.error("Error creating user pool:", error);
    return {
      success: false,
      message: "Failed to create user pool",
      error: error.message,
    };
  }
};

export const updateUserPoolService = async (userPoolId, updateData) => {
  try {
    const updatedUserPool = await UserPool.findByIdAndUpdate(
      userPoolId,
      updateData,
      { new: true }
    );
    if (!updatedUserPool) {
      return { success: false, message: "User pool not found" };
    }
    return {
      success: true,
      message: "User pool updated successfully",
      userPool: updatedUserPool,
    };
  } catch (error) {
    console.error("Error updating user pool:", error);
    return {
      success: false,
      message: "Failed to update user pool",
      error: error.message,
    };
  }
};

export const deleteUserPoolService = async (userPoolId) => {
  try {
    const deletedUserPool = await UserPool.findByIdAndDelete(userPoolId);
    if (!deletedUserPool) {
      return { success: false, message: "User pool not found" };
    }
    return { success: true, message: "User pool deleted successfully" };
  } catch (error) {
    console.error("Error deleting user pool:", error);
    return {
      success: false,
      message: "Failed to delete user pool",
      error: error.message,
    };
  }
};

export const listUsersFromUserPoolService = async (userPoolId) => {
  try {
    const userPool = await UserPool.findById({ _id: userPoolId }).populate(
      "users"
    );
    if (!userPool) {
      throw new Error("User pool not found");
    }
    const users = userPool.users;
    return users;
  } catch (error) {
    console.log(error, "error");
    throw new Error("Failed to fetch user pool");
  }
};

export const createUserInExistingPoolService = async (userPoolId, userData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    userPool.users.push(userData);
    await userPool.save();
    return {
      success: true,
      message: "User added to the pool successfully",
      userPool,
    };
  } catch (error) {
    console.error("Error creating user in pool:", error);
    return {
      success: false,
      message: "Failed to add user to the pool",
      error: error.message,
    };
  }
};

export const getUserPoolByUserIdService = async (userId, userPoolId) => {
  console.log(userId, userPoolId);
  try {
    const userPool = await UserPool.findById(userPoolId);
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

export const updateUserInPoolByIdService = async (
  userPoolId,
  userId,
  updateData
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const userIndex = userPool.users.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userIndex === -1) {
      return { success: false, message: "User not found in the pool" };
    }
    Object.assign(userPool.users[userIndex], updateData);
    await userPool.save();
    return {
      success: true,
      message: "User updated successfully",
      user: userPool.users[userIndex],
    };
  } catch (error) {
    console.error("Error updating user in pool:", error);
    return {
      success: false,
      message: "Failed to update user in the pool",
      error: error.message,
    };
  }
};

export const deleteUserInPoolByIdService = async (userPoolId, userId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const userIndex = userPool.users.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userIndex === -1) {
      return { success: false, message: "User not found in the pool" };
    }
    userPool.users.splice(userIndex, 1);
    await userPool.save();
    return {
      success: true,
      message: "User removed from the pool successfully",
    };
  } catch (error) {
    console.error("Error deleting user from pool:", error);
    return {
      success: false,
      message: "Failed to remove user from the pool",
      error: error.message,
    };
  }
};

/***********   Group Management     ******** */

export const createGroupInPoolService = async (userPoolId, groupData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const existingGroup = userPool.groups.find(
      (group) => group.name === groupData.name
    );
    if (existingGroup) {
      return {
        success: false,
        message: "Group with this name already exists in the pool",
      };
    }
    userPool.groups.push(groupData);
    await userPool.save();

    return {
      success: true,
      message: "Group created successfully",
      group: groupData,
    };
  } catch (error) {
    console.error("Error creating group in pool:", error);
    return {
      success: false,
      message: "Failed to create group in the pool",
      error: error.message,
    };
  }
};

export const updateGroupInPoolService = async (
  userPoolId,
  groupId,
  updateData
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const groupIndex = userPool.groups.findIndex(
      (group) => group._id.toString() === groupId
    );
    if (groupIndex === -1) {
      return { success: false, message: "Group not found in the pool" };
    }
    Object.assign(userPool.groups[groupIndex], updateData);
    await userPool.save();
    return {
      success: true,
      message: "Group updated successfully",
      group: userPool.groups[groupIndex],
    };
  } catch (error) {
    console.error("Error updating group in pool:", error);
    return {
      success: false,
      message: "Failed to update group in the pool",
      error: error.message,
    };
  }
};

export const deleteGroupInPoolService = async (userPoolId, groupId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const groupIndex = userPool.groups.findIndex(
      (group) => group._id.toString() === groupId
    );
    if (groupIndex === -1) {
      return { success: false, message: "Group not found in the pool" };
    }
    userPool.groups.splice(groupIndex, 1);
    await userPool.save();
    return {
      success: true,
      message: "Group removed from the pool successfully",
    };
  } catch (error) {
    console.error("Error deleting group from pool:", error);
    return {
      success: false,
      message: "Failed to remove group from the pool",
      error: error.message,
    };
  }
};

export const getGroupByIdInPoolService = async (userPoolId, groupId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const group = userPool.groups.id(groupId);
    if (!group) {
      return { success: false, message: "Group not found in the pool" };
    }
    return { success: true, message: "Group retrieved successfully", group };
  } catch (error) {
    console.error("Error retrieving group from pool:", error);
    return {
      success: false,
      message: "Failed to retrieve group from the pool",
      error: error.message,
    };
  }
};

export const getGroupByNameInPoolService = async (userPoolId, groupName) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const group = userPool.groups.find((group) => group.name === groupName);
    if (!group) {
      return { success: false, message: "Group not found in the pool" };
    }
    return { success: true, message: "Group retrieved successfully", group };
  } catch (error) {
    console.error("Error retrieving group by name from pool:", error);
    return {
      success: false,
      message: "Failed to retrieve group by name from the pool",
      error: error.message,
    };
  }
};

export const addUsersToGroupService = async (userPoolId, groupId, userIds) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }

    const group = userPool.groups.id(groupId);
    if (!group) {
      return { success: false, message: "Group not found in the pool" };
    }

    if (!Array.isArray(group.members)) {
      group.members = [];
    }

    userIds.forEach((userId) => {
      if (userId && !group.members.includes(userId)) {
        group.members.push(userId);
      }
    });

    await userPool.save();

    return {
      success: true,
      message: "Users added to the group successfully",
      group,
    };
  } catch (error) {
    console.error("Error adding users to group:", error);
    return {
      success: false,
      message: "Failed to add users to the group",
      error: error.message,
    };
  }
};

export const updateExistingGroupService = async (
  userPoolId,
  groupId,
  updateData
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const group = userPool.groups.id(groupId);
    if (!group) {
      return { success: false, message: "Group not found in the pool" };
    }
    Object.assign(group, updateData);
    await userPool.save();
    return { success: true, message: "Group updated successfully", group };
  } catch (error) {
    console.error("Error updating group:", error);
    return {
      success: false,
      message: "Failed to update group",
      error: error.message,
    };
  }
};

export const removeUserFromGroupService = async (
  userPoolId,
  groupId,
  userId
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      throw new Error("User pool not found.");
    }
    const group = userPool.groups.id(groupId);
    if (!group) {
      throw new Error("Group not found in the specified user pool.");
    }
    const userIndex = group.members.indexOf(userId);
    if (userIndex === -1) {
      throw new Error("User is not a member of this group.");
    }
    group.members.splice(userIndex, 1);
    await userPool.save();
    return { message: "User successfully removed from the group", group };
  } catch (error) {
    console.error("Error removing user from group:", error.message);
    throw error;
  }
};

export const deleteGroupByIdService = async (userPoolId, groupId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const group = userPool.groups.id(groupId);
    if (!group) {
      return { success: false, message: "Group not found in the pool" };
    }
    group.remove();
    await userPool.save();
    return { success: true, message: "Group deleted successfully" };
  } catch (error) {
    console.error("Error deleting group:", error);
    return {
      success: false,
      message: "Failed to delete group",
      error: error.message,
    };
  }
};

export const deleteGroupByNameService = async (userPoolId, groupName) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const groupIndex = userPool.groups.findIndex(
      (group) => group.name === groupName
    );
    if (groupIndex === -1) {
      return { success: false, message: "Group not found in the pool" };
    }
    userPool.groups.splice(groupIndex, 1);
    await userPool.save();
    return { success: true, message: "Group deleted successfully" };
  } catch (error) {
    console.error("Error deleting group by name:", error);
    return {
      success: false,
      message: "Failed to delete group by name",
      error: error.message,
    };
  }
};

/***********    SignIn Exp     ******** */

export const getSigninExpService = async (userPoolId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    return { success: true, signin_exp: userPool.signin_exp };
  } catch (error) {
    console.error("Error fetching sign-in experience settings:", error);
    return {
      success: false,
      message: "Failed to get sign-in experience settings",
      error: error.message,
    };
  }
};

export const updateSigninExpService = async (userPoolId, signinExpData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    userPool.signin_exp = { ...userPool.signin_exp._doc, ...signinExpData };
    await userPool.save();
    return {
      success: true,
      message: "Sign-in experience settings updated successfully",
      signin_exp: userPool.signin_exp,
    };
  } catch (error) {
    console.error("Error updating sign-in experience settings:", error);
    return {
      success: false,
      message: "Failed to update sign-in experience settings",
      error: error.message,
    };
  }
};

/***********    SignUp Exp     ******** */

export const getSignupExpService = async (userPoolId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    return { success: true, signup_exp: userPool.signup_exp };
  } catch (error) {
    console.error("Error fetching sign-up experience settings:", error);
    return {
      success: false,
      message: "Failed to get sign-up experience settings",
      error: error.message,
    };
  }
};

export const updateSignupExpService = async (userPoolId, signupExpData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    userPool.signup_exp = { ...userPool.signup_exp._doc, ...signupExpData };
    await userPool.save();
    return {
      success: true,
      message: "Sign-up experience settings updated successfully",
      signup_exp: userPool.signup_exp,
    };
  } catch (error) {
    console.error("Error updating sign-up experience settings:", error);
    return {
      success: false,
      message: "Failed to update sign-up experience settings",
      error: error.message,
    };
  }
};

export const addCustomAttributeService = async (
  userPoolId,
  customAttribute
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }

    if (!Array.isArray(userPool.signup_exp.custom_attributes)) {
      userPool.signup_exp.custom_attributes = [];
    }

    const attributeExists = userPool.signup_exp.custom_attributes.some(
      (attr) => attr.name === customAttribute.name
    );

    if (attributeExists) {
      return { success: false, message: "Custom attribute already exists" };
    }

    userPool.signup_exp.custom_attributes.push(customAttribute);

    await userPool.save();

    return {
      success: true,
      message: "Custom attribute added successfully",
      customAttributes: userPool.signup_exp.custom_attributes,
    };
  } catch (error) {
    console.error("Error adding custom attribute:", error);
    return {
      success: false,
      message: "Failed to add custom attribute",
      error: error.message,
    };
  }
};

/***********    Messaging     ******** */

export const getMessagingSettingsService = async (userPoolId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    return { success: true, messages: userPool.messages };
  } catch (error) {
    console.error("Error fetching messaging settings:", error);
    return {
      success: false,
      message: "Failed to get messaging settings",
      error: error.message,
    };
  }
};

export const addMessagingSettingService = async (userPoolId, messageData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    userPool.messages.push(messageData);
    await userPool.save();
    return {
      success: true,
      message: "Message setting added successfully",
      messages: userPool.messages,
    };
  } catch (error) {
    console.error("Error adding messaging setting:", error);
    return {
      success: false,
      message: "Failed to add messaging setting",
      error: error.message,
    };
  }
};

export const updateMessagingSettingService = async (
  userPoolId,
  messageId,
  messageData
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    const message = userPool.messages.id(messageId);
    if (!message) {
      return { success: false, message: "Message setting not found" };
    }
    Object.assign(message, messageData);
    await userPool.save();
    return {
      success: true,
      message: "Message setting updated successfully",
      messages: userPool.messages,
    };
  } catch (error) {
    console.error("Error updating messaging setting:", error);
    return {
      success: false,
      message: "Failed to update messaging setting",
      error: error.message,
    };
  }
};

export const deleteMessagingSettingService = async (userPoolId, messageId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }
    userPool.messages.pull({ _id: messageId });
    await userPool.save();
    return {
      success: true,
      message: "Message setting deleted successfully",
      messages: userPool.messages,
    };
  } catch (error) {
    console.error("Error deleting messaging setting:", error);
    return {
      success: false,
      message: "Failed to delete messaging setting",
      error: error.message,
    };
  }
};

export const getMessagingSettingsByMessageIdService = async (
  userPoolId,
  messageId
) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      return { success: false, message: "User pool not found" };
    }

    const messageSetting = userPool.messages.id(messageId);
    if (!messageSetting) {
      return { success: false, message: "Message setting not found" };
    }

    return {
      success: true,
      message: "Message setting retrieved successfully",
      messageSetting,
    };
  } catch (error) {
    console.error("Error retrieving message setting:", error);
    return {
      success: false,
      message: "Failed to retrieve message setting",
      error: error.message,
    };
  }
};

/***********    App Integration     ******** */

export const getAllAppClientService = async (userPoolId) => {
  try {
    const userPool = await UserPool.findById(userPoolId).select('app_integration');
    if (!userPool || userPool.app_integration.length === 0) {
      throw new Error('App integration not found');
    }
    return userPool.app_integration[0].app_clients;
  } catch (error) {
    throw new Error(`Error fetching app clients: ${error.message}`);
  }
};

export const getAppClientByIdService = async (userPoolId, clientId) => {
  try {
    const userPool = await UserPool.findById(userPoolId).select('app_integration');
    if (!userPool || userPool.app_integration.length === 0) {
      throw new Error('App integration not found');
    }
    const appClient = userPool.app_integration[0].app_clients.find(client => client.client_id === clientId);
    if (!appClient) {
      throw new Error('App Client not found');
    }
    return appClient;
  } catch (error) {
    throw new Error(`Error fetching app client by ID: ${error.message}`);
  }
};

export const createAppClientService = async (userPoolId, appClientData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      throw new Error('User Pool not found');
    }
    
    userPool.app_integration[0].app_clients.push(appClientData);
    return await userPool.save();
  } catch (error) {
    throw new Error(`Error creating app client: ${error.message}`);
  }
};

export const updateAppClientByIdService = async (userPoolId, clientId, updateData) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      throw new Error('User Pool not found');
    }

    const appClient = userPool.app_integration[0].app_clients.find(client => client.client_id === clientId);
    if (!appClient) {
      throw new Error('App Client not found');
    }

    Object.assign(appClient, updateData);
    return await userPool.save();
  } catch (error) {
    throw new Error(`Error updating app client by ID: ${error.message}`);
  }
};

export const deleteAppClientByIdService = async (userPoolId, clientId) => {
  try {
    const userPool = await UserPool.findById(userPoolId);
    if (!userPool) {
      throw new Error('User Pool not found');
    }
    userPool.app_integration[0].app_clients = userPool.app_integration[0].app_clients.filter(client => client.client_id !== clientId);
    return await userPool.save();
  } catch (error) {
    throw new Error(`Error deleting app client by ID: ${error.message}`);
  }
};

export const getUserPoolDashboardDataService = async (userPoolId) => {
  try {
    const userPool = await UserPool.findById(userPoolId).exec();
    const userPoolObjectId = new Schema.Types.ObjectId(userPoolId)

    if (!userPool) {
      throw new Error('User pool not found');
    }

    const userStats = await UserPool.aggregate([
      { $match: { _id: userPoolObjectId } },
      { $unwind: "$users" },
      {
        $group: {
          _id: "$_id",
          total_users: { $sum: 1 },
          active_users: { $sum: { $cond: [{ $eq: ["$users.status", "active"] }, 1, 0] } },
          pending_users: { $sum: { $cond: [{ $eq: ["$users.status", "pending"] }, 1, 0] } },
          blocked_users: { $sum: { $cond: [{ $eq: ["$users.status", "blocked"] }, 1, 0] } },
          mfa_enabled_users: { $sum: { $cond: ["$users.mfa_enabled", 1, 0] } },
        },
      },
    ]);

    const dashboardData = userStats[0] || {
      total_users: 0,
      active_users: 0,
      pending_users: 0,
      blocked_users: 0,
      mfa_enabled_users: 0,
    };

    return {
      total_users: dashboardData.total_users,
      active_users: dashboardData.active_users,
      pending_users: dashboardData.pending_users,
      blocked_users: dashboardData.blocked_users,
      mfa_enabled_users: dashboardData.mfa_enabled_users,
      total_groups: userPool.groups.length,
      daily_signups: userPool.daily_signups.length,
      daily_signins: userPool.daily_signins.length,
    };
  } catch (error) {
    throw new Error(`Error fetching dashboard data: ${error.message}`);
  }
};