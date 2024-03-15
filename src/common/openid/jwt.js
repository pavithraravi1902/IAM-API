import Promise from "bluebird";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const randomBytes = crypto.randomBytes(32);
export const jwtSecretKey = randomBytes.toString('hex');

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);

export const sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecretKey, options);

export const signSync = (id, options) => sign(id, options, jwt.sign);

export const verify = (token) => jwtVerify(token, jwtSecretKey);
