import express from "express";
import { deactivateClientConfig, getUserByClientId, setUpClient, updateClientConfig } from "./controller.js";
//import authenticateClient from "../../common/middleware/middleware.js";

const router = express.Router();

router.post("/", setUpClient);

router.put('/:clientId', updateClientConfig);

router.put('/:clientId/deactivate', deactivateClientConfig);

router.get('/:clientId',  getUserByClientId)

export default router;