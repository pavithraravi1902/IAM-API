import passport from "passport";
import { Strategy as OIDCStrategy } from "passport-openidconnect";
import { User } from "../../api/auth/model.js";

const configurePassport = () => {
  const clientId = "c04sVco7fw53IXoofSeUqJgTqb5UGJhL";
  const clientSecret =
    "KBcRJkRsEu67cLvQHa06Wu9PqnXfIf8KtNL0rpaQpPHGEib34JhdZHNRVd_n26de";
  const issuer = "http://localhost:4201";

  passport.use(
    new OIDCStrategy(
      {
        issuer: issuer,
        authorizationURL: "http://localhost:4201",
        tokenURL: "http://localhost:4201",
        userInfoURL: "http://localhost:4201",
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:3000/auth/callback",
        scope: "openid profile email",
        mfa: "required",
      },
      (tokenSet, userinfo, done) => {
        if (!userinfo) {
          return done(new Error("Authentication failed"));
        }
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default configurePassport;


// passport.use(
//   new OIDCStrategy(
//     {
//       issuer: issuer,
//       authorizationURL: "http://localhost:4201",
//       tokenURL: "http://localhost:4201",
//       userInfoURL: "http://localhost:4201",
//       clientID: clientId,
//       clientSecret: clientSecrete,
//       callbackURL: "http://localhost:3000/auth/callback",
//       scope: "pavithraravi1902@gmail.com",
//       mfa: "required",
//     },
//     (issuer, sub, profile, accessToken, refreshToken, done) => {
//       return done(null, profile);
//     }
//   )
// );