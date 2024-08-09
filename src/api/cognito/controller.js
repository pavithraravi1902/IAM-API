import {
  adminConfirmSignUpService,
  adminCreateUserService,
  adminDeleteUserService,
  adminDisableUserService,
  adminEnableUserService,
  adminGetUserService,
  adminInitiateAuthService,
  adminListGroupsForUserService,
  adminResetUserPasswordService,
  adminSetUserMFAPreferenceService,
  adminSetUserPasswordService,
  adminSetUserSettingsService,
  adminUpdateUserAttributesService,
  associateSoftwareTokenService,
  changePasswordService,
  cognitoSignUpService,
  confirmPasswordResetService,
  confirmSignUpService,
  createUserPoolService,
  deleteUserPoolService,
  describeUserPoolService,
  getUserService,
  globalSignOutService,
  initiatePasswordResetService,
  respondToAuthChallengeService,
  sendConfirmationCodeService,
  updateUserPoolService,
  verifySoftwareTokenService,
} from "./service.js";

//User Pool management
export const createUserPool = async (req, res) => {
  const { poolName } = req.body;
  try {
    const data = await createUserPoolService(poolName);
    res.status(200).json({ message: "Sign up successful", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing up: ${err.message}` });
  }
};

export const deleteUserPool = async (req, res) => {
  const { userPoolId } = req.params;
  try {
    const data = await deleteUserPoolService(userPoolId);
    res.status(200).json({ message: "deleted successful", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing up: ${err.message}` });
  }
};

export const describeUserPool = async (req, res) => {
  const { userPoolId } = req.params;
  try {
    const data = await describeUserPoolService(userPoolId);
    res.status(200).json({ message: "fetch successfully", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing up: ${err.message}` });
  }
};

export const updateUserPool = async (req, res) => {
  const { userPoolId } = req.params;
  try {
    const data = await updateUserPoolService(userPoolId, req.body);
    res.status(200).json({ message: "Updated successfully", data });
  } catch (err) {
    res.status(500).json({ message: `Error while updating: ${err.message}` });
  }
};

//user management
export const adminCreateUser = async (req, res) => {
  console.log(req.body, "req.body");
  const {
    userPoolId,
    username,
    temporaryPassword,
    userAttributes,
    groupName,
    email,
  } = req.body;

  const userData = {
    UserPoolId: userPoolId,
    Username: username,
    TemporaryPassword: temporaryPassword,
    UserAttributes: userAttributes,
    GroupName: groupName,
    email: email,
  };
  try {
    const response = await adminCreateUserService(userData);
    res
      .status(201)
      .json({ message: "Admin user created successfully", data: response });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error creating admin user: ${err.message}` });
  }
};

export const adminDeleteUser = async (req, res) => {
  const { userPoolId, username } = req.body;
  try {
    const response = await adminDeleteUserService(userPoolId, username);
    res
      .status(201)
      .json({ message: "user deleted successfully", data: response });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error delete user by admin: ${err.message}` });
  }
};

export const adminGetUser = async (req, res) => {
  const { userPoolId, username } = req.query;
  try {
    const response = await adminGetUserService(userPoolId, username);
    res
      .status(201)
      .json({ message: "user fetched successfully", data: response });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error to fetch user by admin: ${err.message}` });
  }
};

export const adminUpdateUserAttributes = async (req, res) => {
  const { userPoolId, username, userAttributes } = req.body;
  try {
    const response = await adminUpdateUserAttributesService(
      userPoolId,
      username,
      userAttributes
    );
    res.status(201).json({
      message: "user attributes updated successfully",
      data: response,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error to update user attribute: ${err.message}` });
  }
};

export const adminDisableUser = async (req, res) => {
  const { userPoolId, username } = req.body;
  try {
    const response = await adminDisableUserService(userPoolId, username);
    res
      .status(201)
      .json({ message: "user disabled by admin successfully", data: response });
  } catch (err) {
    res.status(500).json({ message: `Error to disable user: ${err.message}` });
  }
};

export const adminEnableUser = async (req, res) => {
  const { userPoolId, username } = req.body;
  try {
    const response = await adminEnableUserService(userPoolId, username);
    res
      .status(201)
      .json({ message: "user enabled by admin successfully", data: response });
  } catch (err) {
    res.status(500).json({ message: `Error to disable user: ${err.message}` });
  }
};

export const adminResetUserPassword = async (req, res) => {
  const { userPoolId, username } = req.body;
  try {
    const response = await adminResetUserPasswordService(userPoolId, username);
    res.status(201).json({
      message: "user password reset by admin successfully",
      data: response,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error to update user password: ${err.message}` });
  }
};

export const adminInitiateAuth = async (req, res) => {
  const { userPoolId, clientId, username, password } = req.body;
  try {
    const response = await adminInitiateAuthService(
      userPoolId,
      clientId,
      username,
      password
    );
    res.status(201).json({
      message: "Authentication initiated successfully",
      data: response,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error initiating authentication: ${err.message}` });
  }
};

export const adminSetUserPassword = async (req, res) => {
  const { userPoolId, username, password, permanent } = req.body;
  try {
    const response = await adminSetUserPasswordService(
      userPoolId,
      username,
      password,
      permanent
    );
    res.status(201).json({
      message: "User password set successfully",
      data: response,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error setting user password: ${err.message}` });
  }
};

export const adminConfirmSignUp = async (req, res) => {
  const { userPoolId, username } = req.body;
  try {
    const response = await adminConfirmSignUpService(userPoolId, username);
    res.status(201).json({
      message: "User confirmed successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ message: `Failed to confirm user: ${err.message}` });
  }
};

export const adminListGroupsForUser = async (req, res) => {
  const { userPoolId, username } = req.body;
  try {
    const response = await adminListGroupsForUserService(userPoolId, username);
    res.status(201).json({
      message: "User groups fetched successfully",
      data: response,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Failed to fetch user group: ${err.message}` });
  }
};

export const cognitoSignUp = async (req, res) => {
  const { username, password, email, address, phone_number } = req.body;
  try {
    const data = await cognitoSignUpService(
      username,
      password,
      email,
      address,
      phone_number
    );
    res.status(200).json({ message: "Sign up successful", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing up: ${err.message}` });
  }
};

export const sendConfirmationCode = async (req, res) => {
  const { username } = req.body;
  try {
    const response = await sendConfirmationCodeService(username);
    res.status(201).json({
      message: "Confirmation code successfully sent!",
      data: response,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while send confirmation code: ${err.message}` });
  }
};

export const confirmSignUp = async (req, res) => {
  const { username, code } = req.body;
  try {
    const data = await confirmSignUpService(username, code);
    res.status(200).json({ message: "Confirmation successful", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error confirming sign up: ${err.message}` });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await signInService(username, password);
    res.status(200).json({ message: "Sign in successful", data });
  } catch (err) {
    res.status(500).json({ message: `Error signing in: ${err.message}` });
  }
};

export const respondToAuthChallenge = async (req, res) => {
  const { username, challengeName, challengeResponses, session } = req.body;
  try {
    const data = await respondToAuthChallengeService(
      username,
      challengeName,
      challengeResponses,
      session
    );
    res.status(200).json({ message: "Challenge responded successfully", data });
  } catch (err) {
    res.status(500).json({
      message: `Error responding to authentication challenge: ${err.message}`,
    });
  }
};

export const initiatePasswordReset = async (req, res) => {
  const { username } = req.body;
  try {
    const data = await initiatePasswordResetService(username);
    res.status(200).json({ message: "Password reset initiated", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error initiating password reset: ${err.message}` });
  }
  ``;
};

export const confirmPasswordReset = async (req, res) => {
  const { username, code, newPassword } = req.body;
  try {
    const data = await confirmPasswordResetService(username, code, newPassword);
    res.status(200).json({ message: "Password reset confirmed", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error confirming password reset: ${err.message}` });
  }
};

export const changePassword = async (req, res) => {
  const { accessToken, previousPassword, proposedPassword } = req.body;
  try {
    const data = await changePasswordService(
      accessToken,
      previousPassword,
      proposedPassword
    );
    res.status(200).json({ message: "Password changed successfully", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Failed to change password: ${err.message}` });
  }
};

export const getUser = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const data = await getUserService(accessToken);
    res.status(200).json({ message: "Password changed successfully", data });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Failed to change password: ${err.message}` });
  }
};

export const globalSignOut = async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }
  try {
    const result = await globalSignOutService(accessToken);
    res.json({
      message: "User signed out from all devices successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminSetUserMFAPreference = async (req, res) => {
  const { username, userPoolId, mfaOptions } = req.body;
  if (!username || !userPoolId || !mfaOptions) {
    return res
      .status(400)
      .json({ error: "Username, userPoolId, and mfaOptions are required" });
  }
  try {
    const result = await adminSetUserMFAPreferenceService(
      username,
      userPoolId,
      mfaOptions
    );
    res.json({ message: "User MFA preferences set successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminSetUserSettings = async (req, res) => {
  const { username, userPoolId, mfaOptions } = req.body;
  if (!username || !userPoolId || !mfaOptions) {
    return res
      .status(400)
      .json({ error: "Username, userPoolId, and mfaOptions are required" });
  }
  try {
    const result = await adminSetUserSettingsService(
      username,
      userPoolId,
      mfaOptions
    );
    res.json({ message: "User settings configured successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const associateSoftwareToken = async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: "AccessToken is required" });
  }
  try {
    const result = await associateSoftwareTokenService(accessToken);
    res.json({ message: "Software token associated successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifySoftwareToken = async (req, res) => {
  const { accessToken, userCode, friendlyDeviceName } = req.body;
  if (!accessToken || !userCode) {
    return res
      .status(400)
      .json({ error: "AccessToken and UserCode are required" });
  }
  try {
    const result = await verifySoftwareTokenService(
      accessToken,
      userCode,
      friendlyDeviceName
    );
    res.json({ message: "Software token verified successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
