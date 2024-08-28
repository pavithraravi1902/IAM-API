import {
  createUserPoolService,
  updateUserPoolService,
  deleteUserPoolService,
  listUsersFromUserPoolService,
  createUserInExistingPoolService,
  getUserPoolByUserIdService,
  updateUserInPoolByIdService,
  deleteUserInPoolByIdService,
  createGroupInPoolService,
  updateGroupInPoolService,
  deleteGroupInPoolService,
  getGroupByIdInPoolService,
  getGroupByNameInPoolService,
  removeUserFromGroupService,
  updateExistingGroupService,
  deleteGroupByIdService,
  getSigninExpService,
  updateSigninExpService,
  getSignupExpService,
  updateSignupExpService,
  getMessagingSettingsService,
  addMessagingSettingService,
  updateMessagingSettingService,
  deleteMessagingSettingService,
  addUsersToGroupService,
  addCustomAttributeService,
  getMessagingSettingsByMessageIdService,
} from "./service.js";

/********** User Pool Controllers **********/

export const createUserPool = async (req, res) => {
  const userPoolData = req.body;
  const result = await createUserPoolService(userPoolData);
  res.status(result.success ? 201 : 400).json(result);
};

export const updateUserPool = async (req, res) => {
  const { userPoolId } = req.params;
  const updateData = req.body;
  const result = await updateUserPoolService(userPoolId, updateData);
  res.status(result.success ? 200 : 400).json(result);
};

export const deleteUserPool = async (req, res) => {
  const { userPoolId } = req.params;
  const result = await deleteUserPoolService(userPoolId);
  res.status(result.success ? 200 : 400).json(result);
};

export const listUsersFromUserPool = async (req, res) => {
  const { userPoolId } = req.params;
  try {
    const users = await listUsersFromUserPoolService(userPoolId);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createUserInExistingPool = async (req, res) => {
  const { userPoolId } = req.params;
  const userData = req.body;
  const result = await createUserInExistingPoolService(userPoolId, userData);
  res.status(result.success ? 201 : 400).json(result);
};

export const getUserPoolByUserId = async (req, res) => {
  const { userId, userPoolId } = req.params;
  try {
    const user = await getUserPoolByUserIdService(userId, userPoolId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUserInPoolById = async (req, res) => {
  const { userPoolId, userId } = req.params;
  const updateData = req.body;
  const result = await updateUserInPoolByIdService(
    userPoolId,
    userId,
    updateData
  );
  res.status(result.success ? 200 : 400).json(result);
};

export const deleteUserInPoolById = async (req, res) => {
  const { userPoolId, userId } = req.params;
  const result = await deleteUserInPoolByIdService(userPoolId, userId);
  res.status(result.success ? 200 : 400).json(result);
};

/********** Group Management Controllers **********/

export const createGroupInPool = async (req, res) => {
  const { userPoolId } = req.params;
  const groupData = req.body;
  const result = await createGroupInPoolService(userPoolId, groupData);
  res.status(result.success ? 201 : 400).json(result);
};

export const updateGroupInPool = async (req, res) => {
  const { userPoolId, groupId } = req.params;
  const updateData = req.body;
  const result = await updateGroupInPoolService(
    userPoolId,
    groupId,
    updateData
  );
  res.status(result.success ? 200 : 400).json(result);
};

export const deleteGroupInPool = async (req, res) => {
  const { userPoolId, groupId } = req.params;
  const result = await deleteGroupInPoolService(userPoolId, groupId);
  res.status(result.success ? 200 : 400).json(result);
};

export const getGroupByIdInPool = async (req, res) => {
  const { userPoolId, groupId } = req.params;
  const result = await getGroupByIdInPoolService(userPoolId, groupId);
  res.status(result.success ? 200 : 400).json(result);
};

export const getGroupByNameInPool = async (req, res) => {
  const { userPoolId } = req.params;
  const { groupName } = req.query;
  const result = await getGroupByNameInPoolService(userPoolId, groupName);
  res.status(result.success ? 200 : 400).json(result);
};

export const addUserToGroup = async (req, res) => {
  const { userPoolId, groupId } = req.params;
  const { userIds } = req.body;
  const result = await addUsersToGroupService(userPoolId, groupId, userIds);
  res.status(result.success ? 200 : 400).json(result);
};

export const removeUserFromGroup = async (req, res) => {
  const { userPoolId, groupId, userId } = req.params;
  try {
    const result = await removeUserFromGroupService(
      userPoolId,
      groupId,
      userId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateExistingGroup = async (req, res) => {
  const { userPoolId, groupId } = req.params;
  const updateData = req.body;
  const result = await updateExistingGroupService(
    userPoolId,
    groupId,
    updateData
  );
  res.status(result.success ? 200 : 400).json(result);
};

export const deleteGroupById = async (req, res) => {
  const { userPoolId, groupId } = req.params;
  const result = await deleteGroupByIdService(userPoolId, groupId);
  res.status(result.success ? 200 : 400).json(result);
};

// SignIn Experience Controllers
export const getSigninExp = async (req, res) => {
  const { userPoolId } = req.params;
  const result = await getSigninExpService(userPoolId);
  if (!result.success) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
};

export const updateSigninExp = async (req, res) => {
  const { userPoolId } = req.params;
  const signinExpData = req.body;
  const result = await updateSigninExpService(userPoolId, signinExpData);
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.status(200).json(result);
};

// SignUp Experience Controllers
export const getSignupExp = async (req, res) => {
  const { userPoolId } = req.params;
  const result = await getSignupExpService(userPoolId);
  if (!result.success) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
};

export const updateSignupExp = async (req, res) => {
  const { userPoolId } = req.params;
  const signupExpData = req.body;
  const result = await updateSignupExpService(userPoolId, signupExpData);
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.status(200).json(result);
};

export const addCustomAttribute = async (req, res) => {
  const { userPoolId } = req.params;
  const customAttribute = req.body;

  const result = await addCustomAttributeService(userPoolId, customAttribute);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};


// Messaging Controllers
export const getMessagingSettings = async (req, res) => {
  const { userPoolId } = req.params;
  const result = await getMessagingSettingsService(userPoolId);
  if (!result.success) {
    return res.status(404).json(result);
  }
  res.status(200).json(result);
};

export const addMessagingSetting = async (req, res) => {
  const { userPoolId } = req.params;
  const messageData = req.body;
  const result = await addMessagingSettingService(userPoolId, messageData);
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.status(201).json(result);
};

export const updateMessagingSetting = async (req, res) => {
  const { userPoolId, messageId } = req.params;
  const messageData = req.body;
  const result = await updateMessagingSettingService(
    userPoolId,
    messageId,
    messageData
  );
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.status(200).json(result);
};

export const deleteMessagingSetting = async (req, res) => {
  const { userPoolId, messageId } = req.params;
  const result = await deleteMessagingSettingService(userPoolId, messageId);
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.status(200).json(result);
};

export const getMessagingSettingsByMessageId = async (req, res) => {
  const { userPoolId, messageId } = req.params;

  const result = await getMessagingSettingsByMessageIdService(userPoolId, messageId);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
};

// Get all App Clients
export const getAllAppClients = async (req, res) => {
  try {
    const userPoolId = req.params.userPoolId;
    const appClients = await getAllAppClients(userPoolId);
    res.json(appClients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get App Client by ID
export const getAppClientById = async (req, res) => {
  try {
    const userPoolId = req.params.userPoolId;
    const clientId = req.params.clientId;
    const appClient = await getAppClientById(userPoolId, clientId);
    res.json(appClient);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new App Client
export const createAppClient = async (req, res) => {
  try {
    const userPoolId = req.params.userPoolId;
    const appClientData = req.body;
    const updatedUserPool = await createAppClient(userPoolId, appClientData);
    res.status(201).json(updatedUserPool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an App Client by ID
export const updateAppClientById = async (req, res) => {
  try {
    const userPoolId = req.params.userPoolId;
    const clientId = req.params.clientId;
    const updateData = req.body;
    const updatedUserPool = await updateAppClientById(userPoolId, clientId, updateData);
    res.json(updatedUserPool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an App Client by ID
export const deleteAppClientById = async (req, res) => {
  try {
    const userPoolId = req.params.userPoolId;
    const clientId = req.params.clientId;
    const updatedUserPool = await deleteAppClientById(userPoolId, clientId);
    res.json(updatedUserPool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};