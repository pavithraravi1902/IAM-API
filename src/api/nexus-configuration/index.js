import express from "express";
import { deactivateClientConfig, getUserByClientId, setUpClient, updateClientConfig } from "./controller.js";
import authenticateClient from "../../common/middleware/middleware.js";

const router = express.Router();

router.post("/", setUpClient);

router.put('/:clientId', authenticateClient, updateClientConfig);

router.put('/:clientId/deactivate', authenticateClient, deactivateClientConfig);

router.get('/:clientId',authenticateClient,  getUserByClientId)

export default router;