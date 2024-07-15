import ApplicationConfig from "./model.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const clientDetails = {
  applicationName: "AuthNexus",
  appClients: [
    {
      clientName: "Pavithra",
      tokenValidity: 3600,
    },
  ],
  domainSettings: {
    domainPrefix: "AuthNexus",
  },
  mfa: {
    enabled: true,
    methods: ["SMS", "Email", "TOTP", "Biometric"],
    totp: {
      issuer: "AuthNexus",
      period: 30,
      digits: 6,
    },
    biometric: {
      enabled: true,
      description: "Fingerprint, Face ID, etc.",
    },
  },
  accountRecovery: {
    enabled: true,
    methods: ["Email", "SMS"],
  },
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
  },
  userAttributes: {
    standard: ["email", "phone_number"],
    custom: ["address", "date of birth"],
  },
  identityProviders: [
    {
      providerName: "Google",
      clientId: "google-client-id",
      clientSecret: "google-client-secret",
      redirectUri: "https://yourapp.com/auth/callback/google",
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      userInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
      scopes: ["profile", "email"],
    },
    {
      providerName: "Facebook",
      clientId: "facebook-client-id",
      clientSecret: "facebook-client-secret",
      redirectUri: "https://yourapp.com/auth/callback/facebook",
      authorizationUrl: "https://www.facebook.com/v9.0/dialog/oauth",
      tokenUrl: "https://graph.facebook.com/v9.0/oauth/access_token",
      userInfoUrl: "https://graph.facebook.com/me",
      scopes: ["public_profile", "email"],
    },
  ],
};

export const setupClientService = async (clientDetails) => {
  try {
    const clientId = uuidv4();
    const clientSecret = crypto.randomBytes(32).toString("hex");
    const newClientConfig = await ApplicationConfig.create({
      applicationName: clientDetails.applicationName,
      mfa: clientDetails.mfa || {
        enabled: true,
        methods: ["SMS", "Email", "TOTP", "Biometric"],
        totp: {
          issuer: clientDetails.applicationName,
          period: 30,
          digits: 6,
        },
        biometric: {
          enabled: true,
          description: "Fingerprint, Face ID, etc.",
        },
      },
      accountRecovery: clientDetails.accountRecovery || {
        enabled: true,
        methods: ["Email", "SMS"],
      },
      passwordPolicy: clientDetails.passwordPolicy || {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
      },
      userAttributes: clientDetails.userAttributes || {
        standard: ["email", "phone_number"],
        custom: ["address", "date of birth"],
      },
      appClients: [
        {
          clientName: clientDetails.appClients[0].clientName,
          clientId: clientId,
          clientSecret: clientSecret,
          generateSecret: true,
          tokenValidity: clientDetails.appClients[0].tokenValidity || 3600,
        },
      ],
      domainSettings: {
        domainPrefix: clientDetails.domainSettings.domainPrefix,
      },
      identityProviders: clientDetails.identityProviders || [],
    });

    return {
      success: true,
      message: "Client configuration saved successfully",
      clientId: clientId,
      clientSecret: clientSecret,
      config: newClientConfig,
    };
  } catch (error) {
    console.error("Error setting up client:", error);
    return {
      success: false,
      message: "Error setting up client",
      error: error,
    };
  }
};

export const updateClientConfigService = async (clientId, updateDetails) => {
  try {
    const updatedConfig = await ApplicationConfig.findOneAndUpdate(
      { "appClients.clientId": clientId }, 
      { $set: updateDetails }, 
      { new: true, runValidators: true }
    );

    if (!updatedConfig) {
      throw new Error("Client configuration not found");
    }

    return {
      message: "Client configuration updated successfully",
      config: updatedConfig,
    };
  } catch (error) {
    console.error("Error updating client configuration:", error);
    throw new Error(`Error updating client configuration: ${error.message}`);
  }
};

export const deactivateClientConfigService = async (clientId) => {
  try {
    const existingConfig = await ApplicationConfig.findOne({
      "appClients.clientId": clientId,
    });

    if (!existingConfig) {
      throw new Error("Client configuration not found");
    }
    const client = existingConfig.appClients.find(
      (c) => c.clientId === clientId
    );

    if (!client) {
      throw new Error("Client not found in configuration");
    }
    client.isActive = false;
    const updatedConfig = await existingConfig.save();

    return {
      message: "Client configuration deactivated successfully",
      config: updatedConfig,
    };
  } catch (error) {
    console.error("Error deactivating client configuration:", error);
    throw new Error(
      `Error deactivating client configuration: ${error.message}`
    );
  }
};

export const getUserByClientIdService = async (clientId) => {
  try {
    const appConfig = await ApplicationConfig.findOne({
      "appClients.clientId": clientId,
    });
    if (!appConfig) {
      throw new Error("Client configuration not found");
    }
    const client = appConfig.appClients.find(
      (client) => client.clientId === clientId
    );
    if (!client) {
      throw new Error("Client not found");
    }
    const result = {
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      clientName: client.clientName,
      tokenValidity: client.tokenValidity,
      isActive: client.isActive,
    };
    return result;
  } catch (error) {
    console.error("Failed to retrieve user by client Id:", error);
    throw new Error(`Failed to retrieve user by client Id: ${error.message}`);
  }
};
