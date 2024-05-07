import { createProfileService, updateProfileService } from "./service.js";

export const createProfile = (req, res) => {
    createProfileService(req.body)
    .then((user) => {
      res.status(200).json({ message: "User profile created successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};

export const updateProfile = (req, res) => {
    updateProfileService(req.body)
    .then((user) => {
      res.status(200).json({ message: "User profile updated successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};
