import {
  AdminAddUserToGroupCommand,
  AdminConfirmSignUpCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminGetUserCommand,
  AdminInitiateAuthCommand,
  AdminListGroupsForUserCommand,
  AdminResetUserPasswordCommand,
  AdminSetUserMFAPreferenceCommand,
  AdminSetUserPasswordCommand,
  AdminSetUserSettingsCommand,
  AdminUpdateUserAttributesCommand,
  AssociateSoftwareTokenCommand,
  ChangePasswordCommand,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  CreateUserPoolCommand,
  DeleteUserPoolCommand,
  DescribeUserPoolCommand,
  ForgotPasswordCommand,
  GetUserCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  RespondToAuthChallengeCommand,
  SignUpCommand,
  UpdateUserPoolCommand,
  VerifySoftwareTokenCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import { clientCognito } from "../../common/aws/cognito.js";
import CognitoUser from "./model.js";

const clientId = "5j6sue1pf7pvv36ehq2carmc03";
const clientSecret = "8rvpflf47fjvn9m8prsj298qf1v4opjnek645pn74cjko0uubg0";

function generateSecretHash(username, clientId, clientSecret) {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}

const cognitoSignUpServiceParam = {
  username: "devipriya",
  password: "thrishaJasmine@123",
  email: "jasmine@gmail.com",
  address: "No. 25",
  phone_number: "9999999999",
};

//User Pool Management
export const createUserPoolService = async (poolName) => {
  const params = {
    PoolName: poolName,
  };
  try {
    const command = new CreateUserPoolCommand(params);
    const response = await clientCognito.send(command);
    console.log("User pool created successfully:", response);
    return response;
  } catch (err) {
    console.error("Error creating user pool:", err);
    throw err;
  }
};

export const updateUserPoolService = async (userPoolId, updates) => {
  const params = {
    UserPoolId: userPoolId,
    ...updates,
  };
  try {
    const command = new UpdateUserPoolCommand(params);
    const response = await clientCognito.send(command);
    console.log("User pool updated successfully:", response);
    return response;
  } catch (err) {
    console.error("Error updating user pool:", err);
    throw err;
  }
};

export const deleteUserPoolService = async (userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
  };
  try {
    const command = new DeleteUserPoolCommand(params);
    const response = await clientCognito.send(command);
    console.log("User pool deleted successfully:", response);
    return response;
  } catch (err) {
    console.error("Error deleting user pool:", err);
    throw err;
  }
};

export const describeUserPoolService = async (userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
  };
  try {
    const command = new DescribeUserPoolCommand(params);
    const response = await clientCognito.send(command);
    console.log("User pool details retrieved successfully:", response);
    return response;
  } catch (err) {
    console.error("Error retrieving user pool details:", err);
    throw err;
  }
};

//user management
export const adminCreateUserService = async (userData) => {
  const { UserPoolId, Username, TemporaryPassword, UserAttributes, GroupName } =
    userData;
  const params = {
    UserPoolId,
    Username,
    TemporaryPassword: TemporaryPassword || "TempPass123!",
    UserAttributes: UserAttributes || [
      { Name: "email", Value: userData.email },
      { Name: "email_verified", Value: "true" },
    ],
    MessageAction: "SUPPRESS",
  };
  try {
    const createUserCommand = new AdminCreateUserCommand(params);
    const response = await clientCognito.send(createUserCommand);
    console.log("Admin user created successfully:", response);
    if (GroupName) {
      const addUserToGroupParams = {
        UserPoolId,
        Username,
        GroupName,
      };
      const addUserToGroupCommand = new AdminAddUserToGroupCommand(
        addUserToGroupParams
      );
      const groupResponse = await clientCognito.send(addUserToGroupCommand);
      console.log("User added to group successfully:", groupResponse);
    }

    return response;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw new Error(error.message || "Failed to create admin user");
  }
};

export const adminDeleteUserService = async (userPoolId, username) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminDeleteUserCommand(params);
    const response = await clientCognito.send(command);
    console.log("User deleted successfully:", response);
    return response;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};

export const adminGetUserService = async (userPoolId, username) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminGetUserCommand(params);
    const response = await clientCognito.send(command);
    console.log("User details retrieved successfully:", response);
    return response;
  } catch (err) {
    console.error("Error retrieving user details:", err);
    throw err;
  }
};

export const adminUpdateUserAttributesService = async (
  userPoolId,
  username,
  userAttributes
) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    UserAttributes: userAttributes,
  };
  try {
    const command = new AdminUpdateUserAttributesCommand(params);
    const response = await clientCognito.send(command);
    console.log("User attributes updated successfully:", response);
    return response;
  } catch (err) {
    console.error("Error updating user attributes:", err);
    throw err;
  }
};

export const adminDisableUserService = async (userPoolId, username) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminDisableUserCommand(params);
    const response = await clientCognito.send(command);
    console.log("User disabled successfully:", response);
    return response;
  } catch (err) {
    console.error("Error disabling user:", err);
    throw err;
  }
};

export const adminEnableUserService = async (userPoolId, username) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminEnableUserCommand(params);
    const response = await clientCognito.send(command);
    console.log("User enabled successfully:", response);
    return response;
  } catch (err) {
    console.error("Error enabling user:", err);
    throw err;
  }
};

export const adminResetUserPasswordService = async (userPoolId, username) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminResetUserPasswordCommand(params);
    const response = await clientCognito.send(command);
    console.log("User password reset successfully:", response);
    return response;
  } catch (err) {
    console.error("Error resetting user password:", err);
    throw err;
  }
};

export const adminInitiateAuthService = async (
  userPoolId,
  clientId,
  username,
  password
) => {
  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: userPoolId,
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new AdminInitiateAuthCommand(params);
    const response = await clientCognito.send(command);
    console.log("Authentication initiated successfully:", response);
    return response;
  } catch (err) {
    console.error("Error initiating authentication:", err);
    throw err;
  }
};

export const adminSetUserPasswordService = async (
  userPoolId,
  username,
  password,
  permanent = true
) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
    Password: password,
    Permanent: permanent,
  };
  try {
    const command = new AdminSetUserPasswordCommand(params);
    const response = await clientCognito.send(command);
    console.log("User password set successfully:", response);
    return response;
  } catch (err) {
    console.error("Error setting user password:", err);
    throw err;
  }
};

export const adminConfirmSignUpService = async (username, userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminConfirmSignUpCommand(params);
    const response = await cogn.send(command);
    console.log("User confirmed successfully:", response);
    return response;
  } catch (error) {
    console.error("Error confirming user:", error);
    throw error;
  }
};

export const adminListGroupsForUserService = async (username, userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  try {
    const command = new AdminListGroupsForUserCommand(params);
    const response = await clientCognito.send(command);
    console.log("User groups:", response.Groups);
    return response.Groups;
  } catch (error) {
    console.error("Error listing user groups:", error);
    throw error;
  }
};

//authentication authoization
export const cognitoSignUpService = async (
  username,
  password,
  email,
  address,
  phone_number
) => {
  console.log(username, password, email, address, phone_number);
  const clientId = "5j6sue1pf7pvv36ehq2carmc03";
  const clientSecret = "8rvpflf47fjvn9m8prsj298qf1v4opjnek645pn74cjko0uubg0";
  const params = {
    ClientId: clientId,
    SecretHash: generateSecretHash(username, clientId, clientSecret),
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "address",
        Value: address,
      },
      {
        Name: "phone_number",
        Value: phone_number,
      },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const data = await clientCognito.send(command);
    console.log("Sign up successful:", data);
    return data;
  } catch (err) {
    console.error("Error signing up:", err);
    throw err;
  }
};

const createAdminUserServiceParam = {
  UserPoolId: "ap-southeast-2_2FyxQEWCS",
  Username: "devipriya",
  UserAttributes: [{ Name: "email", Value: "jasmine@gmail.com" }],
  TemporaryPassword: "thrishaJasmine@123",
};

export const sendConfirmationCodeService = async (username) => {
  const params = {
    ClientId: clientId,
    SecretHash: generateSecretHash(username, clientId, clientSecret),
    Username: username,
  };

  try {
    const command = new ResendConfirmationCodeCommand(params);
    const data = await clientCognito.send(command);
    console.log("Confirmation code sent successfully:", data);
    return data;
  } catch (err) {
    console.error("Error while sending confirmation code:", err);
    throw err;
  }
};

export const confirmSignUpService = async (username, code) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
    ConfirmationCode: code,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    const data = await clientCognito.send(command);
    console.log("Confirmation successful:", data);

    await CognitoUser.updateOne({ username }, { confirmed: true });
    return data;
  } catch (err) {
    console.error("Error confirming sign up:", err);
    throw err;
  }
};

export const signInService = async (username, password) => {
  // Generate the SecretHash
  const secretHash = generateSecretHash(username, clientId, clientSecret);

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const data = await clientCognito.send(command);
    console.log("Sign in successful:", data);
    return data;
  } catch (err) {
    console.error("Error signing in:", err);
    throw err;
  }
};

export const respondToAuthChallengeService = async (
  username,
  challengeName,
  challengeResponses,
  session
) => {
  const params = {
    ClientId: clientId, // Replace with your actual Client ID
    ChallengeName: challengeName, // Example: 'SMS_MFA', 'CUSTOM_CHALLENGE', etc.
    ChallengeResponses: {
      USERNAME: username,
      ...challengeResponses, // Example: {'SMS_MFA_CODE': '123456'}, or other required parameters
    },
    Session: session, // Session returned from the InitiateAuth call
  };
  try {
    const command = new RespondToAuthChallengeCommand(params);
    const response = await clientCognito.send(command);
    console.log("Challenge responded successfully:", response);
    return response;
  } catch (error) {
    console.error("Error responding to authentication challenge:", error);
    throw error;
  }
};

export const initiatePasswordResetService = async (username) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
  };
  try {
    const command = new ForgotPasswordCommand(params);
    const data = await clientCognito.send(command);
    console.log("Password reset initiated:", data);

    await CognitoUser.updateOne(
      { username },
      { confirmationCode: data.CodeDeliveryDetails.Destination }
    );
    return data;
  } catch (err) {
    console.error("Error initiating password reset:", err);
    throw err;
  }
};

export const confirmPasswordResetService = async (
  username,
  code,
  newPassword
) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
  };
  try {
    const command = new ConfirmForgotPasswordCommand(params);
    const data = await clientCognito.send(command);
    console.log("Password reset confirmed:", data);

    await CognitoUser.updateOne({ username }, { password: newPassword });
    return data;
  } catch (err) {
    console.error("Error confirming password reset:", err);
    throw err;
  }
};

export const changePasswordService = async (
  accessToken,
  previousPassword,
  proposedPassword
) => {
  const params = {
    AccessToken: accessToken,
    PreviousPassword: previousPassword,
    ProposedPassword: proposedPassword,
  };
  try {
    const command = new ChangePasswordCommand(params);
    const response = await clientCognito.send(command);
    return {
      message: "Password changed successfully",
      response,
    };
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change password");
  }
};

export const getUserService = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };
  try {
    const command = new GetUserCommand(params);
    const response = await clientCognito.send(command);
    return response;
  } catch (error) {
    console.error("Error retrieving user information:", error);
    throw new Error("Failed to retrieve user information");
  }
};

export const globalSignOutService = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };
  try {
    const command = new GlobalSignOutCommand(params);
    const response = await clientCognito.send(command);
    return response;
  } catch (error) {
    console.error("Error signing out user globally:", error);
    throw new Error("Failed to sign out user from all devices");
  }
};

//MFA and Security

export const adminSetUserMFAPreferenceService = async (
  username,
  userPoolId,
  mfaOptions
) => {
  const params = {
    Username: username,
    UserPoolId: userPoolId,
    SMSMfaSettings: mfaOptions.SMSMfaSettings,
    SoftwareTokenMfaSettings: mfaOptions.SoftwareTokenMfaSettings,
  };
  try {
    const command = new AdminSetUserMFAPreferenceCommand(params);
    const response = await clientCognito.send(command);
    return response;
  } catch (error) {
    console.error("Error setting user MFA preferences:", error);
    throw new Error("Failed to set user MFA preferences");
  }
};

export const adminSetUserSettingsService = async (
  username,
  userPoolId,
  mfaOptions
) => {
  const params = {
    Username: username,
    UserPoolId: userPoolId,
    MFAOptions: mfaOptions,
  };
  try {
    const command = new AdminSetUserSettingsCommand(params);
    const response = await clientCognito.send(command);
    return response;
  } catch (error) {
    console.error("Error setting user settings:", error);
    throw new Error("Failed to set user settings");
  }
};

export const associateSoftwareTokenService = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };
  try {
    const command = new AssociateSoftwareTokenCommand(params);
    const response = await clientCognito.send(command);
    return response;
  } catch (error) {
    console.error("Error associating software token:", error);
    throw new Error("Failed to associate software token");
  }
};

export const verifySoftwareTokenService = async (
  accessToken,
  userCode,
  friendlyDeviceName
) => {
  const params = {
    AccessToken: accessToken,
    UserCode: userCode,
    FriendlyDeviceName: friendlyDeviceName,
  };
  try {
    const command = new VerifySoftwareTokenCommand(params);
    const response = await clientCognito.send(command);
    return response;
  } catch (error) {
    console.error("Error verifying software token:", error);
    throw new Error("Failed to verify software token");
  }
};
