import { createUserService, loginService } from "./service.js";

export const createUser = (req, res) => {
  createUserService(req.body)
    .then((user) => {
      res.status(200).json({ message: "User created successfully", user });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    });
};

export const login = async (req, res) => {
  try {
    const user = await loginService(req);
    res.status(200).json({ message: "User login successfully", user });
    //res.redirect('/http://localhost:4201');
  } catch (error) {
    console.log(error, "error value");
    res
      .status(error.status || 401)
      .json({ message: error.message || "Authentication failed" });
  }
};
