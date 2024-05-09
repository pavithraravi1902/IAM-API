const modulePermissions = {
  user: ["admin", "user", "super user"],
  dashboard: ["admin"],
  profile: ["user", "admin"],
  settings: ["user", "admin"],
  role_management: ["super user"],
};

const canAccessModule = (userRole, moduleName) => {
  return modulePermissions[moduleName].includes(userRole);
};

// Custom authorization middleware
function authorizeModule(moduleName) {
  return function (req, res, next) {
    const userRole = req.user?.role;

    if (canAccessModule(userRole, moduleName)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  };
}

export default authorizeModule;
