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
      read: {
        type: Boolean,
        required: true,
      },
      write: {
        type: Boolean,
        required: true,
      },
      delete: {
        type: Boolean,
        required: true,
      }
    },
    {
      _id: false,
    }
  );

  const RolesModel = new Schema(
    {
      authNexusId: {
        type: String,
        required: true,
      },
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
  
  export const AuthRoles = mongoose.model("AuthRoles", RolesModel);

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

  const UserRoleModel = new Schema(
    {
      authNexusId: {
        type: String,
        required: true,
      },
      roleId: {
        type: String,
        required: true,
      },
      users: [UserModel],
    }
  );
  
  export const UserRoles = mongoose.model("UserRoles", UserRoleModel);

  const AuthNexusFeatureRole = new Schema(
    {
      authNexusId: {
        type: String,
        required: true,
      },
      featureName: {
        type: String,
        required: true,
      },
      featureCode: {
        type: String,
        required: true,
        unique: true,
      },
      publish: {
        type: Boolean,
        default: true,
      },
    },
    {
      strict: true,
      timestamps: true,
    }
  );
  
  export const AuthNexusFeature = mongoose.model(
    "AuthNexusFeature",
    AuthNexusFeatureRole
  );
  