import 'dotenv/config';

import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminInitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { fromEnv } from "@aws-sdk/credential-providers";

console.log('Server is running on port:', process.env.PORT);
console.log('Database URI:', process.env.DB_URI);
console.log('AWS Region:', process.env.AWS_REGION);

export const clientCognito = new CognitoIdentityProviderClient({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: 'AKIAX6DJQWMI4U7EXZMH',
    secretAccessKey: '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'
  },
});

const createUserParams = {
  UserPoolId: "ap-southeast-2_2FyxQEWCS",
  Username: "thrishajasmine",
  UserAttributes: [{ Name: "email", Value: "jasmine@gmail.com" }],
  TemporaryPassword: "thrishaJasmine@123",
};

// const createUserCommand = new AdminCreateUserCommand(createUserParams);

// try {
//   const data = await client.send(createUserCommand);
//   console.log("User created:", data);

//   const adminInitiateAuthParams = {
//     AuthFlow: "ADMIN_NO_SRP_AUTH",
//     UserPoolId: "ap-southeast-2_2FyxQEWCS",
//     ClientId: "5j6sue1pf7pvv36ehq2carmc03",
//     AuthParameters: {
//       USERNAME: "thrishajasmine",
//       PASSWORD: "thrishaJasmine@123",
//     },
//   };

//   const adminInitiateAuthCommand = new AdminInitiateAuthCommand(adminInitiateAuthParams);

//   try {
//     const authData = await client.send(adminInitiateAuthCommand);
//     console.log("Authentication successful:", authData);
//   } catch (authErr) {
//     console.error("Error authenticating user:", authErr);
//   }
// } catch (err) {
//   console.error("Error creating user:", err);
// }
