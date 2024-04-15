export const getRolesByUserIdService = async ({ userId }) => {
    return new Promise((resolve, reject) => {
      UserRoles.find({ "users.userId": userId })
        .then((users) => {
          const roleIds = users?.map((x) => x.roleId) || [];
          return InstituteRoles.find({ _id: { $in: roleIds } })
            .then(notFoundError(reject))
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  };