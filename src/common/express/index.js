import bodyParser from "body-parser";
import { errorHandler as bodyErrorHandler } from "bodymen";
import compression from "compression";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "../../common/openid/passport.js";
import path from "path";
import { errorHandler as queryErrorHandler } from "querymen";
import sessionTimeoutMiddleware from "../openid/session.js";
import { isAdmin, isUser } from "../openid/access.js";

export default (apiRoot, routes) => {
  const app = express();
  const __dirname = new URL(".", import.meta.url).pathname;
  const clientId = "c04sVco7fw53IXoofSeUqJgTqb5UGJhL";
  const clientSecret =
    "KBcRJkRsEu67cLvQHa06Wu9PqnXfIf8KtNL0rpaQpPHGEib34JhdZHNRVd_n26de";
  const issuer = "http://localhost:3001/login";
  const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
  app.use(
    session({
      secret: clientSecret,
      resave: false,
      saveUninitialized: false,
    })
  );

  // Passport initialization after session middleware
  app.use(passport.initialize());
  app.use(passport.session());

  //app.use(sessionTimeoutMiddleware);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");
  app.use(cors());
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.use(cors());
  app.options("*", cors());
  app.use(compression());
  app.use(morgan("dev"));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  app.get(
    "/users/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/users/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:3001",
      failureRedirect: "/",
    })
  );

  app.get("/admin/dashboard", isAdmin, (req, res) => {
    res.send("Admin Dashboard");
  });

  app.get("/user/profile", isUser, (req, res) => {
    res.send("User Profile");
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ message: err });
  });

  return app;
};
