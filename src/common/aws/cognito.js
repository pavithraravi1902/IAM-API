import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
  } from "@aws-sdk/client-cognito-identity-provider";
  
  const USER_POOL_ID = "ap-southeast-2_2FyxQEWCS";
  const CLIENT_ID = "5j6sue1pf7pvv36ehq2carmc03";
  const CLIENT_SECRET = "8rvpflf47fjvn9m8prsj298qf1v4opjnek645pn74cjko0uubg0";
  
  const cognitoClient = new CognitoIdentityProviderClient({
    region: "eu-west-1",
  });

  const generateSecretHash = (username, clientId, clientSecret) => {
    const crypto = require("crypto");
    return crypto
      .createHmac("SHA256", clientSecret)
      .update(username + clientId)
      .digest("base64");
  };

  const authenticateUser = async (username, password) => {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(username, CLIENT_ID, CLIENT_SECRET),
      },
    };
  
    try {
      const command = new InitiateAuthCommand(params);
      const response = await cognitoClient.send(command);
      console.log("Authentication successful:", response.AuthenticationResult);
    } catch (err) {
      console.error("Error authenticating user:", err);
    }
  };

  const run = async () => {
    const username = "pavithra"; 
    const password = "Pavi@123"; 
    await authenticateUser(username, password);
  };
  
  run().catch(console.error);
  
  export default cognitoClient;
  