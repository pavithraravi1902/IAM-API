import { Router } from "express";
import { body } from "express-validator";
import {
  deleteAuthNexusRole,
  deleteUserRole,
  getAuthNexusFeature,
  getAuthNexusRoles,
  getRolesByUserId,
  getUsersByRoleId,
  updateAuthNexusFeature,
  updateAuthNexusRoles,
  updateUserRole,
} from "./controller.js";
const router = new Router();

/**
 * @api {get} /roles/:authNexusId/roles Retrieve AuthNexus roles
 */
router.get("/:authNexusId", getAuthNexusRoles);

/**
 * @api {put} /roles/:authNexusId/roles Update AuthNexus role
 */
router.put(
  "/:authNexusId",
  body("feature")
    .exists()
    .notEmpty()
    .withMessage("Feature is required in the body"),
  updateAuthNexusRoles
);

/**
 * @api {delete} /roles/:id Delete AuthNexus Role
 */
router.delete("/:id", deleteAuthNexusRole);

/**
 * @api {put} /roles/:authNexusId/user-role Update AuthNexus role
 */
router.put(
  "/:authNexusId/user-role",
  body("roleId")
    .exists()
    .notEmpty()
    .withMessage("Role is required in the body"),
  updateUserRole
);

/**
 * @api {delete} /roles/:id delete user role
 */
router.delete("/:roleId/:userId", deleteUserRole);

/**
 * @api {get}/user-by-role-id /:roleId Retrieve User by role Id
 */
router.get("/user-by-role-id/:roleId", getUsersByRoleId);

/**
 * @api {get}/role-by-user-id /:userId Retrieve roles by user Id
 */
router.get("/role-by-user-id/:userId", getRolesByUserId);

/**
 * @api {get} /roles/:authNexusId/features Retrieve AuthNexus roles
 */
// canAccess(Constants.FEATURE_VIEW_ALL_USERS),
router.get("/:authNexusId/features", getAuthNexusFeature);

/**
 * @api {put} /roles/:authNexusId/roles Update AuthNexus role
 */
router.put(
  "/:authNexusId/features",
  body("feature")
    .exists()
    .notEmpty()
    .withMessage("Feature is required in the body"),
  updateAuthNexusFeature
);

export default router;
