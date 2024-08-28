import express from "express";
import {
  addCustomAttribute,
  addMessagingSetting,
  addUserToGroup,
  createAppClient,
  createGroupInPool,
  createUserInExistingPool,
  createUserPool,
  deleteAppClientById,
  deleteGroupById,
  deleteGroupInPool,
  deleteMessagingSetting,
  deleteUserInPoolById,
  deleteUserPool,
  getAllAppClients,
  getAppClientById,
  getGroupByIdInPool,
  getGroupByNameInPool,
  getMessagingSettings,
  getMessagingSettingsByMessageId,
  getSigninExp,
  getSignupExp,
  getUserPoolByUserId,
  listUsersFromUserPool,
  removeUserFromGroup,
  updateAppClientById,
  updateExistingGroup,
  updateGroupInPool,
  updateMessagingSetting,
  updateSigninExp,
  updateSignupExp,
  updateUserInPoolById,
  updateUserPool
} from "./controller.js";

const router = express.Router();

/********** User Pool Routes **********/
router.post("/", createUserPool);
router.put("/:userPoolId", updateUserPool);
router.delete("/:userPoolId", deleteUserPool);
router.get("/:userPoolId/users", listUsersFromUserPool);
router.post("/:userPoolId/users", createUserInExistingPool);
router.get("/:userPoolId/users/:userId", getUserPoolByUserId);
router.put("/:userPoolId/users/:userId", updateUserInPoolById);
router.delete("/:userPoolId/users/:userId", deleteUserInPoolById);

/********** Group Management Routes **********/
router.post("/:userPoolId/groups", createGroupInPool);
router.put("/:userPoolId/groups/:groupId", updateGroupInPool);
router.delete("/:userPoolId/groups/:groupId", deleteGroupInPool);
router.get("/:userPoolId/groups/:groupId", getGroupByIdInPool);
router.get("/:userPoolId/groups", getGroupByNameInPool);
router.post("/:userPoolId/groups/:groupId", addUserToGroup);
router.delete(
  "/:userPoolId/groups/:groupId/users/:userId",
  removeUserFromGroup
);
router.put("/:userPoolId/groups/:groupId", updateExistingGroup);
router.delete("/:userPoolId/groups/:groupId", deleteGroupById);

/********** SignIn Experience Routes **********/
router.get("/:userPoolId/signin-exp", getSigninExp);
router.put("/:userPoolId/signin-exp", updateSigninExp);

/********** SignUp Experience Routes **********/
router.get("/:userPoolId/signup-exp", getSignupExp);
router.put("/:userPoolId/signup-exp", updateSignupExp);
router.post("/:userPoolId/custom-attributes", addCustomAttribute);

/********** Messaging Routes **********/
router.get("/:userPoolId/messages", getMessagingSettings);
router.post("/:userPoolId/messages", addMessagingSetting);
router.put("/:userPoolId/messages/:messageId", updateMessagingSetting);
router.delete("/:userPoolId/messages/:messageId", deleteMessagingSetting);
router.get("/:userPoolId/messages/:messageId", getMessagingSettingsByMessageId);

/********** App Integration Routes **********/
router.get("/:userPoolId/app-clients", getAllAppClients);
router.get("/:userPoolId/app-clients/:clientId", getAppClientById);
router.post("/:userPoolId/app-clients", createAppClient);
router.put("/:userPoolId/app-clients/:clientId", updateAppClientById);
router.delete("/:userPoolId/app-clients/:clientId", deleteAppClientById);

export default router;
