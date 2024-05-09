import passport from "passport";
import FacebookStrategy from "passport-facebook";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env["FACEBOOK_APP_ID"],
      clientSecret: process.env["FACEBOOK_APP_SECRET"],
      callbackURL: "https://www.example.com/oauth2/redirect/facebook",
    },
    async function (req, accessToken, refreshToken, profile, done) {
      try {
      } catch (error) {
        return done(error);
      }
    }
  )
);
