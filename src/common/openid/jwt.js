import Promise from "bluebird";
import jwt from "jsonwebtoken";

export const jwtSecretKey = process.env.JWT_SECRET_KEY || "jwtsecret";

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);

export const signSync = (id, options) => sign(id, options, jwt.sign);

export const sign = async (id, options) => {
  try {
    return await jwtSign({ id }, jwtSecretKey, options);
  } catch (error) {
    console.error("Failed to sign JWT token:", error);
    throw new Error("Failed to sign JWT token");
  }
};

export const verify = async (token) => {
  try {
    return await jwtVerify(token, jwtSecretKey);
  } catch (error) {
    console.error("Failed to verify JWT token:", error);
    throw new Error("Invalid JWT token");
  }
};

export const createResetToken = async (userId) => {
  try {
    const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
    const payload = {
      userId: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: expiration,
    };
    const token = jwt.sign(payload, jwtSecretKey);
    return token;
  } catch (error) {
    console.error("Failed to create reset token:", error);
    throw new Error("Failed to create reset token");
  }
};

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log(decoded, "decoded");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
