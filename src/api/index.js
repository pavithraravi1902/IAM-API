import express from "express";
import user from "./auth/index.js"
import document from "./file-upload/index.js"
import swagger from "../common/swagger/index.js";
import payment from "./payment/index.js"
import profile from "./user-profile/index.js"
import roles from "./role-management/index.js"
import adminConfigs from "./admin-config/index.js"
import activityMonitoring from "./activity-montoring/index.js"

const router = express.Router();

router.use("/users", user);

router.use("/profile", profile);

router.use("/document", document);

router.use("/payment", payment);

router.use("/api-docs", swagger);

router.use("/roles", roles);

router.use("/admin-configs", adminConfigs);

router.use("/activity-monitoring", activityMonitoring)

export default router;