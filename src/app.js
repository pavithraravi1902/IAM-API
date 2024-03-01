// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import http from "http";
// import api from "./api/index.js";
// import { User } from "./api/auth/model.js";

// const apiRoot = '';
// const app = express(apiRoot, api);
// const server = http.createServer(app);


// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // app.post("/users", (req, res) => {
// //   console.log(req.body, "post method req");
// //   const user = User.create(req.body);
// //   if (user) {
// //     res.send("created successfully!");
// //     console.log(res);
// //   } else {
// //     console.log(res);
// //     return "failed to send new data";
   
// //   }
// // });

// const uri =
//   "mongodb+srv://pavithraravi1902:admin@cluster0.dkndfpx.mongodb.net/";

// mongoose
//   .connect(uri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import http from "http";
import api from "./api";
import express from "./common/express";
import mongoose from "./common/mongoose";
import { apiRoot, env, ip, mongo, port } from "./config";

const app = express(apiRoot, api);
const server = http.createServer(app);

// Polyfill for allseetled
if (!Promise.allSettled) {
  Promise.allSettled = (promises) =>
    Promise.all(
      promises.map((promise, i) =>
        promise
          .then((value) => ({
            status: "fulfilled",
            value,
          }))
          .catch((reason) => ({
            status: "rejected",
            reason,
          }))
      )
    );
}

if (mongo.uri) {
  mongoose.connect(mongo.uri);
}
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log("apiRoot", apiRoot, "apiRoot");
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      env
    );
  });
});

export default app;
