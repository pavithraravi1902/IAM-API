const modulePermissions = {
  user: ["admin", "user", "super user"],
  dashboard: ["admin"],
  profile: ["user", "admin"],
  settings: ["user", "admin"],
  role_management: ["super user"],
};

const canAccessModule = (userRole, moduleName) => {
  return modulePermissions[moduleName]?.includes(userRole);
};

// Custom authorization middleware
function authorizeModule(moduleName) {
  return function (req, res, next) {
    const userRole = req.user?.role;

    if (canAccessModule(userRole, moduleName)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
      res.redirect('/');
    }
  };
}

export default authorizeModule;

// import { getRolesByUserIdService } from "../../api/role-management/service.js";

// export default (permission, field = "edit") =>
//   async (req, res, next) => {
//     if (!permission || permission === "undefined" || permission.length === 0) {
//       throw new Error(
//         res,
//         403,
//         "You do not have the authorization to access this"
//       );
//     }
//     const access = await getRolesByUserIdService({
//       userId: req.userId,
//       ...req.body,
//     });
//     const roles = permission;
//     console.log(
//       JSON.stringify(
//         access.filter((f) =>
//           f.roles.some(
//             (o) => roles.includes(o.featureCode) && field && (o.all || o[field])
//           )
//         ).length > 0
//       )
//     );
//     if (
//       access.filter((f) =>
//         f.roles.some(
//           (o) => roles.includes(o.featureCode) && field && (o.all || o[field])
//         )
//       ).length > 0
//     ) {
//       return next();
//     }
//     throw new Error(
//       res,
//       403,
//       "You do not have the authorization to access this"
//     );
//   };
