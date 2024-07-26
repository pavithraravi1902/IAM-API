import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { errorHandler as bodyErrorHandler } from "bodymen";
import compression from "compression";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import LocalStrategy from "passport-local";
import path from "path";
import { errorHandler as queryErrorHandler } from "querymen";
import { logRequest } from "../../api/activity-montoring/controller.js";
import { User } from "../../api/auth/model.js";
import logger from "../winston/logger.js";

export default (apiRoot, routes) => {
  const app = express();

  const __dirname = new URL(".", import.meta.url).pathname;

  const clientSecret =
    "KBcRJkRsEu67cLvQHa06Wu9PqnXfIf8KtNL0rpaQpPHGEib34JhdZHNRVd_n26de";

  // Configure CORS options
  const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
    optionSuccessStatus: 200,
  };

  //winston
  const activityLogger = (req, res, next) => {
    const { method, url } = req;
    const user = req.user ? req.user.username : "guest";
    const message = `${user} ${method} ${url} at ${new Date().toISOString()}`;

    logger.info(message);

    next();
  };

  // Session middleware
  app.use(
    session({
      secret: clientSecret,
      resave: false,
      saveUninitialized: false,
    })
  );

  // Passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

  //winston
  app.use(activityLogger);

  // Static files and view engine setup
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");

  const dbLogger = (req, res, next) => {
    logRequest(req, res, next);
  };
  app.use(dbLogger);

  // Logging and compression
  app.use(morgan("dev"));
  app.use(compression());

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  // CORS
  app.use(cors(corsOptions));

  // Authenticate clientId
  //app.use(authenticate);

  // Passport local strategy setup
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialize/deserialize user
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, email: user.email, role: user.role });
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Request logging and authorization
  app.get("/", (req, res, next) => {
    res.render("index.ejs");
  });

  // API routes
  app.use(apiRoot, routes);

  // Error handling
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  // Google OAuth routes
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

  app.use(function useExtraction(req, res, next) {
    const authCode = req.get("Authorization");
    console.log(authCode);
    console.log("Time: ", Date.now(), authCode);
    if (authCode) {
      verify(authCode)
        .then((payload) => {
          req.userId = payload.id;
          if (req.body && !req.body.userId) {
            req.body.userId = payload.id;
          }
          return null;
        })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  });

  return app;
};
