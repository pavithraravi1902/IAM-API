import { cognitoClient } from "../../common/aws/index.js";
import CognitoUser from "./model.js";
import {
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const cognitoSignUpService = async (username, password, email) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const data = await cognitoClient.send(command);
    console.log("Sign up successful:", data);

    const newUser = new CognitoUser({
      username,
      email,
      password,
    });

    await newUser.save();
    return data;
  } catch (err) {
    console.error("Error signing up:", err);
    throw err;
  }
};

export const cognitoConfirmSignUpService = async (username, code) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
    ConfirmationCode: code,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    const data = await cognitoClient.send(command);
    console.log("Confirmation successful:", data);

    await CognitoUser.updateOne({ username }, { confirmed: true });
    return data;
  } catch (err) {
    console.error("Error confirming sign up:", err);
    throw err;
  }
};

export const cognitoSignInService = async (username, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const data = await cognitoClient.send(command);
    console.log("Sign in successful:", data);
    return data;
  } catch (err) {
    console.error("Error signing in:", err);
    throw err;
  }
};

export const cognitoInitiatePasswordResetService = async (username) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
  };

  try {
    const command = new ForgotPasswordCommand(params);
    const data = await cognitoClient.send(command);
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

export const cognitoConfirmPasswordResetService = async (username, code, newPassword) => {
  const params = {
    ClientId: "5j6sue1pf7pvv36ehq2carmc03",
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
  };

  try {
    const command = new ConfirmForgotPasswordCommand(params);
    const data = await cognitoClient.send(command);
    console.log("Password reset confirmed:", data);

    await CognitoUser.updateOne({ username }, { password: newPassword });
    return data;
  } catch (err) {
    console.error("Error confirming password reset:", err);
    throw err;
  }
};
