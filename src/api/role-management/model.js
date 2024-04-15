import mongoose from "mongoose";
const { Schema } = mongoose;

const RolesClassModel = new Schema(
  {
    featureCode: {
      type: String,
      required: true,
    },
    all: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const RolesModel = new Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [RolesClassModel],
  },
  {
    strict: true,
    timestamps: true,
  }
);

export const Roles = mongoose.model("Roles", RolesModel);

const UserModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

const UserRoleModel = new Schema({
  roleId: {
    type: String,
    required: true,
  },
  users: [UserModel],
});

export const UserRoles = mongoose.model("UserRoles", UserRoleModel);
