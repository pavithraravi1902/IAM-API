import express from "express";
import {
  adminConfirmSignUp,
  adminCreateUser,
  adminDeleteUser,
  adminDisableUser,
  adminEnableUser,
  adminGetUser,
  adminInitiateAuth,
  adminListGroupsForUser,
  adminResetUserPassword,
  adminSetUserMFAPreference,
  adminSetUserPassword,
  adminSetUserSettings,
  adminUpdateUserAttributes,
  associateSoftwareToken,
  changePassword,
  cognitoSignUp,
  confirmPasswordReset,
  confirmSignUp,
  createUserPool,
  deleteUserPool,
  describeUserPool,
  getUser,
  globalSignOut,
  initiatePasswordReset,
  respondToAuthChallenge,
  sendConfirmationCode,
  signIn,
  updateUserPool,
  verifySoftwareToken,
} from "./controller.js";
const router = express.Router();

//user-pool management
router.post("/user-pool", createUserPool);
router.put("/user-pool/:userPoolId", updateUserPool);
router.get("/user-pool/:userPoolId", describeUserPool);
router.delete("/user-pool/:userPoolId", deleteUserPool);
//user-management
router.post("/admin-signup", adminCreateUser);
router.delete("/admin-delete-user", adminDeleteUser);
router.get("/admin-fetch-user", adminGetUser);
router.put("/admin-update-user-attribute", adminUpdateUserAttributes);
router.put("/admin-disable-user", adminDisableUser);
router.put("/admin-enable-user", adminEnableUser);
router.post("/admin-reset-user-password", adminResetUserPassword);
router.post("/admin-initiate-auth", adminInitiateAuth);
router.post("/admin-set-user-password", adminSetUserPassword);
router.post("/admin-confirm-user", adminConfirmSignUp);
router.post("/admin-list-user-group", adminListGroupsForUser);

router.post("/signup", cognitoSignUp);
router.post("/send-code", sendConfirmationCode);
router.post("/confirm-signup", confirmSignUp);
router.post("/signin", signIn);
router.post("/respond-challenge", respondToAuthChallenge);
router.post("/initiate-password-reset", initiatePasswordReset);
router.post("/confirm-password-reset", confirmPasswordReset);
router.post("/change-password", changePassword);
router.post("/get-user", getUser);
router.post("/global-signout", globalSignOut);
router.post("/set-user-mfa-preference", adminSetUserMFAPreference);
router.post("/set-user-settings", adminSetUserSettings);
router.post("/associate-software-token", associateSoftwareToken);
router.post("/associate-software-token", verifySoftwareToken);

export default router;
