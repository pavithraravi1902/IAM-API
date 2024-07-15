// import ApplicationConfig from "../../api/nexus-configuration/model.js";

// const authenticateClient = async (req, res, next) => {
//   console.log(req.headers, "request");
//   const { clientid, clientsecret } = req.headers;

//   if (!clientid || !clientsecret) {
//     return res
//       .status(401)
//       .json({ message: "Client ID and Client Secret are required" });
//   }
//   console.log(clientid, clientsecret);
//   try {
//     const activeUser = await ApplicationConfig.findOne({
//       "appClients.clientId": clientid,
//       "appClients.clientSecret": clientsecret,
//     });
    
//     if (!activeUser.appClients.isActive) {
//       throw new Error("User account Deactivated, try to recover");
//     }

//     const appConfig = await ApplicationConfig.findOne({
//       "appClients.clientId": clientid,
//       "appClients.clientSecret": clientsecret,
//       "appClients.isActive": true,
//     });
//     console.log(appConfig, "appConfig");
//     if (!appConfig) {
//       return res.status(401).json({ message: "Invalid client credentials" });
//     }
//     res.redirect(clientConfig.callbackUrl);
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res
//       .status(500)
//       .json({ message: "Authentication error", error: error.message });
//   }
// };

// export default authenticateClient;

import ApplicationConfig from "../../api/nexus-configuration/model.js";
import { generateResetToken } from "../openid/otp.js";

const authenticateClient = async (req, res, next) => {
  console.log(req.headers, "request");
  const { clientid, clientsecret } = req.headers;

  if (!clientid || !clientsecret) {
    return res
      .status(401)
      .json({ message: "Client ID and Client Secret are required" });
  }

  console.log(clientid, clientsecret);
  try {
    const appConfig = await ApplicationConfig.findOne({
      "appClients.clientId": clientid,
      "appClients.clientSecret": clientsecret,
      "appClients.isActive": true,
    });
    console.log(appConfig, "appConfig")

    if (!appConfig) {
      return res.status(401).json({ message: "Invalid client credentials or user account deactivated" });
    }

    // Find the specific client configuration
    const clientConfig = appConfig.appClients.find(client => client.clientId === clientid);

    if (!clientConfig || !clientConfig.isActive) {
      return res.status(401).json({ message: "Client account is deactivated" });
    }

    const token = generateResetToken({ clientId: clientid }, appConfig.appClients[0].tokenValidity);
    //res.redirect(clientConfig.callbackUrl);

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(500)
      .json({ message: "Authentication error", error: error.message });
  }
};

export default authenticateClient;
