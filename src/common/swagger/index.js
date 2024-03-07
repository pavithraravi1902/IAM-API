import { Router } from "express";
import {SWAGGER_API_HOST}  from "../../config.js";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"
const router = new Router();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
// const yamlPath = path.join(__dirname, "/.");
// const swaggerDocument = YAML.load(yamlPath);
// swaggerDocument.host = SWAGGER_API_HOST;
// router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;