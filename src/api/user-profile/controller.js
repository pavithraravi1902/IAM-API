import { createProfileService, deleteUserByIdService, getAllUserService, getUserProfileByIdService, updateProfileService } from "./service.js";

export const createProfile = (req, res) => {
  createProfileService(req.body)
    .then((user) => {
      res
        .status(200)
        .json({ message: "User profile created successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Failed to create user profile" });
    });
};

export const getUserProfileById = (req, res) => {
  getUserProfileByIdService(req.body)
    .then((user) => {
      res.status(200).json({
        message: `Successfully retrieved user data by userId: ${user?.userId} `,
        user,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({
        message: error.message || "Failed to retrieve user data by user id",
      });
    });
};

export const deleteUserById = (req, res) => {
  deleteUserByIdService(req.body)
    .then((user) => {
      res.status(200).json({
        message: `Successfully user data deleted`,
        user,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({
        message: error.message || "Failed to delete user data by user id",
      });
    });
};

export const getAllUser = (req, res) => {
  getAllUserService(req.body)
    .then((user) => {
      res.status(200).json({
        message: `Successfully retrieved existing user data`,
        user,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({
        message: error.message || "Failed to retrieve user data",
      });
    });
};

export const updateProfile = (req, res) => {
  updateProfileService(req.body)
    .then((user) => {
      res
        .status(200)
        .json({ message: "User profile updated successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};
