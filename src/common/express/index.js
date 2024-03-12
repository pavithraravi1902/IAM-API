import bodyParser from "body-parser";
import { errorHandler as bodyErrorHandler } from "bodymen";
import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandler as queryErrorHandler } from "querymen";
import path from "path";
import session from "express-session";
import passport from "passport";
import { Strategy as OIDCStrategy } from 'passport-openidconnect';

export default (apiRoot, routes) => {
  const app = express();
  const __dirname = new URL(".", import.meta.url).pathname;
  const clientId = "c04sVco7fw53IXoofSeUqJgTqb5UGJhL";
  const clientSecrete =
    "KBcRJkRsEu67cLvQHa06Wu9PqnXfIf8KtNL0rpaQpPHGEib34JhdZHNRVd_n26de";
  const issuer = "http://localhost:3000/login";

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");
  app.use(
    session({
      secret: clientSecrete,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
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

  return app;
};
