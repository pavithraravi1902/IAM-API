import {
  deactivateClientConfigService,
  getUserByClientIdService,
  setupClientService,
  updateClientConfigService,
} from "./service.js";

export const setUpClient = async (req, res) => {
  try {
    const clientDetails = req.body;

    const result = await setupClientService(clientDetails);

    if (result.success) {
      res.status(200).json({
        message: "Client configured successfully",
        clientId: result.clientId,
        clientSecret: result.clientSecret,
        config: result.config,
      });
    } else {
      res.status(500).json({
        message: "Failed to configure client",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error setting up client:", error);
    res.status(500).json({
      message: "Failed to configure client",
      error: error.message,
    });
  }
};

export const updateClientConfig = async (req, res) => {
  try {
    const { clientId } = req.params;
    const result = await updateClientConfigService(clientId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deactivateClientConfig = async (req, res) => {
  const { clientId } = req.params;
  try {
    const result = await deactivateClientConfigService(clientId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserByClientId = async (req, res) => {
  const { clientId } = req.params;
  try {
    const result = await getUserByClientIdService(clientId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
