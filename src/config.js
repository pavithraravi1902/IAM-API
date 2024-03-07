import merge from "lodash/merge.js";
import path from "path";
import dotenv from "dotenv-safe";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  root: path.join(__dirname, ".."),
  port: process.env.PORT || 3000,
  ip: process.env.IP || "0.0.0.0",
  apiRoot: process.env.API_ROOT || "",
  SWAGGER_API_HOST: "http://localhost:3000",
  mongo: {
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
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

export const SWAGGER_API_HOST = "http://localhost:3000"