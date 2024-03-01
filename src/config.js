/* eslint-disable no-unused-vars */
import merge from 'lodash/merge.js';
import path from "path";

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

const dotenv = require("dotenv-safe");
dotenv.config({
  path: path.join(__dirname, "../.env"),
  example: path.join(__dirname, "../.env.example"),
});

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 3000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "",
    mongo: {
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    },
  },
  test: {
    mongo: {
      uri: process.env.DB_URI,
      options: {
        debug: true,
      },
    },
  },
  development: {
    mongo: {
      uri: "mongodb+srv://pavithraravi1902:admin@cluster0.dkndfpx.mongodb.net/",
      options: {
        debug: true,
      },
    },
  },
};
module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
