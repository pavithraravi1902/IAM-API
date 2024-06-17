import { AuthNexusFeature, AuthRoles, UserRoles } from "./model.js";
import { User } from "../auth/model.js";

export const getAuthNexusRolesService = async ({ authNexusId }) => {
  const roleList = [];
  try {
    console.log(authNexusId, "authNexusId");
    const roles = await AuthRoles.find({
      authNexusId: authNexusId,
    });
    console.log(roles, "roles");
    for (const role of roles) {
      const userRoles = await UserRoles.findOne({ roleId: role._id });
      console.log(userRoles);
      const count = userRoles?.users.length || 0;
      const obj = {
        _id: role._id,
        roleName: role.roleName,
        noofUsers: count,
        roles: role.roles,
      };
      roleList.push(obj);
    }
  } catch (err) {
    console.error("Error fetching roles:", err.message);
  }
  console.log(roleList, "roleList");
  return roleList;
};

export const updateAuthNexusRolesService = async ({ authNexusId }, body) => {
  const obj = body.id
    ? { authNexusId: authNexusId, _id: body.id }
    : { authNexusId: authNexusId, roleName: body.roleName };
  try {
    const result = await AuthRoles.findOneAndUpdate(obj, body, {
      upsert: true,
      new: true,
    });
    if (result) {
      return { message: "Roles updated successfully!" };
    }
    return { message: "Failed to update roles." };
  } catch (error) {
    console.error("Error updating role:", error);
    throw new Error("Failed to update role");
  }
};

export const deleteAuthNexusRoleService = async (params) => {
  try {
    const result = await AuthRoles.deleteOne({ _id: params.id });
    if (result.deletedCount > 0) {
      const deleteRole = await UserRoles.deleteOne({ roleId: params.id });
      if (deleteRole.deletedCount > 0) {
        return {
          status: 200,
          message: "Role deleted successfully",
        };
      }
    }
    return {
      status: 404,
      message: "Role not found or already deleted",
    };
  } catch (error) {
    console.error("Error deleting role:", error);
    throw new Error("Failed to delete");
  }
};

export const getAuthNexusFeatureService = async ({ authNexusId }) => {
  try {
    if (!authNexusId) {
      throw new Error("Required AuthNexus Id");
    }
    console.log(authNexusId, "authNexusId");
    const authFeature = await AuthNexusFeature.find({
      authNexusId: authNexusId,
    });
    console.log(authFeature);
    return authFeature;
  } catch (error) {
    throw new Error(error ? error : "Failed to fetch feature");
  }
};

export const updateAuthNexusFeatureService = async ({ authNexusId }, body) => {
  try {
    const authNexusFeature = await AuthNexusFeature.findOneAndUpdate(
      { authNexusId, featureCode: body.featureCode },
      body,
      { upsert: true }
    );
    if (authNexusFeature) {
      return { message: "Feature updated successfully!!" };
    } else {
      return { message: "Failed to Update Feature" };
    }
  } catch (error) {
    throw new Error(error ? error : "Failed to update authNexus feature");
  }
};

export const deleteUserRoleService = async (params) => {
  try {
    const result = await UserRoles.updateOne(
      { roleId: params.roleId },
      { $pull: { users: { userId: params.userId } } }
    );
    if (result.nModified > 0) {
      return {
        status: 200,
        message: "User role deleted successfully",
      };
    }
  } catch (error) {
    throw new Error(
      error
        ? error
        : {
            status: 404,
            message: "User role not found",
          }
    );
  }
};

export const updateUserRoleService = async ({ authNexusId }, body) => {
  const arrayUserId = body.users || [];
  try {
    const user = await UserRoles.findOne({ authNexusId, roleId: body.roleId });
    if (user) {
      const userIds = user?.users || [];
      const userIdOld = arrayUserId.filter((obj) =>
        userIds.filter((x) => x.userId === obj.userId)
      );
      const userIdNew = userIds.filter((obj) =>
        arrayUserId.filter((x) => x.userId != obj.userId)
      );
      body.users = userIdNew.concat(userIdOld) || [];
      const userRole = await UserRoles.findOneAndUpdate(
        { authNexusId, roleId: body.roleId },
        body,
        { upsert: true }
      );
      if (userRole) {
        return { message: "Role updated successfully!!" };
      } else {
        return { message: "Failed to update role" };
      }
    }
  } catch (error) {
    throw new Error(error ? error : "Failed to update role");
  }
};

export const getUsersByRoleIdService = async ({ roleId }) => {
  console.log(roleId, "roleId");
  // try {
  //   const role = await UserRoles.findOne({ roleId: roleId });
  //   if (!role) {
  //     throw new Error("Role not found");
  //   }
  //   console.log(role, "role");
  //   const userIds = role.users?.map((x) => x.userId) || [];
  //   console.log(userIds, "userIds");
  //   const users = await User.find({ _id: { $in: userIds } });
  //   console.log(users, "users");
  //   if (!users.length) {
  //     throw new Error("Users not found");
  //   }

  //   return users;
  // } catch (error) {
  //   console.error("Error fetching users by role ID:", error);
  //   throw new Error("Failed to get users by role ID");
  // }
};

export const addAuthNexusFeatureService = async (data) => {
  try {
    if (!data) {
      throw new Error("Data is required to add feature");
    }
    const addFeature = await AuthNexusFeature.create(data);
    console.log(addFeature, "addFeature");
    return addFeature;
  } catch (error) {
    console.error("Error adding feature:", error);
    throw new Error("Failed to add feature");
  }
};

export const getRolesByUserIdService = async ({ userId }) => {
  // try {
  //   const users = UserRoles.find({ "users.userId": userId });
  //   if (users) {
  //     const roleIds = users?.map((x) => x.roleId) || [];
  //     const res = await AuthRoles.find({ _id: { $in: roleIds } });
  //     return res
  //   } else{
  //     throw new Error("User not found");
  //   }
  // } catch (error) {
  //   throw new Error(error ? error : "Failed to fetch roles by userId")
  // }
};
