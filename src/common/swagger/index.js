import { Router } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const router = new Router();
const SWAGGER_API_HOST = "localhost:3000";

const yamlPath = path.join("src/common/swagger", "/swagger.yaml");
const swaggerDocument = YAML.load(yamlPath);
swaggerDocument.host = SWAGGER_API_HOST;
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
