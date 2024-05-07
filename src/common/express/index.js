// import bodyParser from "body-parser";
// import { errorHandler as bodyErrorHandler } from "bodymen";
// import compression from "compression";
// import cors from "cors";
// import express from "express";
// import session from "express-session";
// import morgan from "morgan";
// import path from "path";
// import { errorHandler as queryErrorHandler } from "querymen";
// import sessionTimeoutMiddleware from "../openid/session.js";
// import canAccessModule from "../openid/access.js";
// import passport from "passport";

// export default (apiRoot, routes) => {
//   const app = express();

//   const __dirname = new URL(".", import.meta.url).pathname;

//   const clientId = "c04sVco7fw53IXoofSeUqJgTqb5UGJhL";
//   const clientSecret =
//     "KBcRJkRsEu67cLvQHa06Wu9PqnXfIf8KtNL0rpaQpPHGEib34JhdZHNRVd_n26de";
//   const issuer = "http://localhost:3001/login";

//   // Configure CORS options
//   const corsOptions = {
//     origin: "http://localhost:3001",
//     credentials: true,
//     optionSuccessStatus: 200,
//   };

//   // Session middleware
//   app.use(
//     session({
//       secret: clientSecret,
//       resave: false,
//       saveUninitialized: false,
//     })
//   );

//   // Passport middleware
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Static files and view engine
//   app.use(express.static(path.join(__dirname, "public")));
//   app.set("view engine", "ejs");

//   // Logging and compression
//   app.use(morgan("dev"));
//   app.use(compression());

//   // Body parsing
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // CORS
//   app.use(cors(corsOptions));

//   // Custom authorization middleware with Passport local authentication
//   function authorizeModule(req, res, next) {
//     const moduleName = req.rootPathName;

//     // Use Passport local authentication middleware
//     passport.authenticate('local', (err, user, info) => {
//       console.log(info, "message")
//       console.log('LocalStrategy user:', user); 
//       if (err) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
    
//       if (!user) {
//         return res.status(401).json({ error: 'Unauthorized' });
//       }
    
//       const userRole = user.role;
//       console.log('User role:', userRole);
    
//       if (canAccessModule(userRole, moduleName)) {
//         next();
//       } else {
//         res.status(403).json({ error: 'Forbidden' });
//       }
//     })(req, res, next);
//   }

//   // Request logging and authorization
//   app.use((req, res, next) => {
//     console.log(req);
//     // const pathPattern = /^\/([^\/]+)/;
//     // const match = req.path.match(pathPattern);
//     // req.rootPathName = match ? match[1] : null;
//    // authorizeModule(req, res, next);
//   });

//   // API routes
//   app.use(apiRoot, routes);

//   // Error handling
//   app.use(queryErrorHandler());
//   app.use(bodyErrorHandler());

//   // Google OAuth routes
//   app.get(
//     "/users/google",
//     passport.authenticate("google", { scope: ["email", "profile"] })
//   );
//   app.get(
//     "/users/google/callback",
//     passport.authenticate("google", {
//       successRedirect: "http://localhost:3001",
//       failureRedirect: "/",
//     })
//   );

//   // Global error handler
//   app.use((err, req, res, next) => {
//     console.log(err, "global error");
//     res.status(500).json({ message: err.message || "Internal Server Error" });
//   });

//   return app;
// };

import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import path from "path";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import { errorHandler as bodyErrorHandler } from "bodymen";
import { errorHandler as queryErrorHandler } from "querymen";
import { User } from "../../api/auth/model.js";
import canAccessModule from "../openid/access.js";
import sessionTimeoutMiddleware from "../openid/session.js";

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

  // Static files and view engine setup
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");

  // Logging and compression
  app.use(morgan("dev"));
  app.use(compression());

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use(cors(corsOptions));

  // Passport local strategy setup
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user); // User authenticated successfully
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serialize/deserialize user
  passport.serializeUser((user, done) => {
    console.log(user, "serializeUser");
    done(null, { id: user.id, email: user.email, role: user.role });
  });

  passport.deserializeUser(async (id, done) => {
    console.log(id, "deserializeUser");
    try {
      const user = await User.findById(id);
      console.log(id, "deserializeUser");
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

  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  });

  return app;
};

