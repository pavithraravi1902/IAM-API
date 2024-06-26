import http from "http";
import api from "./api/index.js";
import express from "./common/express/index.js";
import mongoose from "./common/mongoose/index.js";
import { config } from "./config.js";
const { apiRoot, mongo, port, ip, env } = config;

const app = express(apiRoot, api);
const server = http.createServer(app);

if (mongo.uri) {
  mongoose.connect(mongo.uri);
}
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      env
    );
  });
});

export default app;
