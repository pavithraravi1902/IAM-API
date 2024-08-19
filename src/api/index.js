import express from "express";
import swagger from "../common/swagger/index.js";
import activityMonitoring from "./activity-montoring/index.js";
import adminConfigs from "./admin-config/index.js";
import user from "./auth/index.js";
import document from "./file-upload/index.js";
import payment from "./payment/index.js";
import roles from "./role-management/index.js";
import profile from "./user-profile/index.js";
import clientSetup from "./nexus-configuration/index.js";
import metadatacollection from "./metadata-collection/index.js";
import cognito from "./cognito/index.js";
import userPool from "./user-pool/index.js"

const router = express.Router();

router.use("/users", user);

router.use("/profile", profile);

router.use("/document", document);

router.use("/payment", payment);

router.use("/api-docs", swagger);

router.use("/roles", roles);

router.use("/admin-configs", adminConfigs);

router.use("/activity-monitoring", activityMonitoring);

router.use("/client-set-up", clientSetup);

router.use("/meta-data", metadatacollection);

router.use("/cognito", cognito);

router.use("/user-pool", userPool)

export default router;
