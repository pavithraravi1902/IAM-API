import {
  createUserPoolService,
  getUserPoolByUserIdService,
  listUsersFromUserPoolService,
  updateUserDetailsByUserIdService,
} from "./service.js";

export const createUserPool = async (req, res) => {
  try {
    const userPool = await createUserPoolService(req.body);
    res
      .status(200)
      .json({ message: "User Pool created successfully!", userPool });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to create User Pool" });
  }
};

export const getUserPoolByUserId = async (req, res) => {
  const { poolId, userId } = req.params;
  try {
    const userPool = await getUserPoolByUserIdService(userId, poolId);
    res
      .status(200)
      .json({ message: "User Pool retrieved successfully!", userPool });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to retrieve User Pool" });
  }
};

export const listUsersFromUserPool = async (req, res) => {
  const { poolId } = req.params;
  try {
    const userPool = await listUsersFromUserPoolService(poolId);
    res
      .status(200)
      .json({ message: "User Pool retrieved successfully!", userPool });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to retrieve User Pool" });
  }
};

export const updateUserDetailsByUserId = async (req, res) => {
  const { poolId, userId } = req.params;
  try {
    const userPool = await updateUserDetailsByUserIdService(poolId, userId, req.body);
    res
      .status(200)
      .json({ message: "User Pool retrieved successfully!", userPool });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to retrieve User Pool" });
  }
};
