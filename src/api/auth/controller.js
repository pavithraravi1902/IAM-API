import { createUserService, loginService } from "./service.js";

export const createUser = (req, res) => {
    createUserService(req.body) 
      .then((user) => {
        res.status(200).json({ message: "User created successfully", user });
      })
      .catch((error) => {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
      });
  };

  export const login = (req, res) => {
    loginService(req.body) 
      .then((user) => {
        res.status(200).json({ message: "User login successfully", user });
      })
      .catch((error) => {
        res.status(error.status || 501).json({ message: error.message || "Internal server error" });
      });
  };
