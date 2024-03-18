import { createUserService, loginService, verifyOtpService } from "./service.js";

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
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "Authentication failed" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    console.log(req.body, "controller console")
    const verify = await verifyOtpService(req.body);
    res.status(200).json({ message: "OTP verified successfully" }).redirect('http://localhost:4201');
  } catch (error) {
    res
      .status(error.status || 401)
      .json({ message: error.message || "OTP verification failed" });
  }
};

// export const accessToken = async (req, res) => {
//   try {
//     const token = await accessTokenService(req, res);
//     console.log(token, "tokennnnn");
//     res.status(200).json({ message: "token", data: token });
//   } catch (error) {
//     res.status(error.status || 401).json({ message: error.message });
//   }
// };

// export const sigin = async (req, res) => {
//   try {
//     const google_info = await siginWithGoogleService(req);
//     res.status(200).json({ message: "google profile info", google_info });
//   } catch (error) {
//     res
//       .status(error.status || 401)
//       .json({ message: error.message});
//   }
// };
