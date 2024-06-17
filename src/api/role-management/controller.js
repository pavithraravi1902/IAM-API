import {
  addAuthNexusFeatureService,
  deleteAuthNexusRoleService,
  deleteUserRoleService,
  getAuthNexusFeatureService,
  getAuthNexusRolesService,
  getRolesByUserIdService,
  getUsersByRoleIdService,
  updateAuthNexusFeatureService,
  updateAuthNexusRolesService,
  updateUserRoleService,
} from "./service.js";

export const getAuthNexusRoles = async ({ params }, res) => {
  console.log(params, "params")
  try {
    const {authNexusId} = params
    const user = await getAuthNexusRolesService(authNexusId);
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const updateAuthNexusRoles = async ({ params, body }, res) => {
  try {
    const role = await updateAuthNexusRolesService(params, {
      authNexusId: params.authNexusId,
      ...body,
    });
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const deleteAuthNexusRole = async ({ params }, res) => {
  try {
    const role = await deleteAuthNexusRoleService(params);
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const getAuthNexusFeature = async ({ params, query }, res) => {
  try {
    const role = await getAuthNexusFeatureService(params, query);
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const updateAuthNexusFeature = async ({ params, body }, res) => {
  try {
    const role = await updateAuthNexusFeatureService(params, {
      authNexusId: params.authNexusId,
      ...body,
    });
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const updateUserRole = async ({ params, body }, res) => {
  try {
    const role = await updateUserRoleService(params, {
      authNexusId: params.authNexusId,
      ...body,
    });
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const deleteUserRole = async ({ params }, res) => {
  try {
    const role = await deleteUserRoleService(params);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const getUsersByRoleId = async ({ params, body }, res) => {
  try {
    const role = await getUsersByRoleIdService({
      roleId: params.roleId,
      ...body,
    });
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const getRolesByUserId = async ({ params, body }, res) => {
  try {
    const role = await getRolesByUserIdService({
      userId: params.userId,
      ...body,
    });
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};

export const addAuthNexusFeature = async ({ body }, res) => {
  try {
    const role = await addAuthNexusFeatureService({ ...body });
    res.status(200).json({ message: role });
  } catch (error) {
    res.status(error && error.status ? error.status : 400).json(error);
  }
};
