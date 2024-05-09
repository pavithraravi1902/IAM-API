import passport from "passport";
import { User } from "../../api/auth/model.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.use(new GoogleStrategy({
    clientID: "1043116758259-0rjgl2irub8sempl72pl6t2fa766ftkq.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/users/google/callback",
    scope: ['email', 'profile'],
    passReqToCallback: true
  },
  async function(req, accessToken, refreshToken, profile, done) {
    try {
      if (req.user) {
        req.user.username = profile.displayName;
        req.user.email = profile.emails[0].value;
        req.user.googleId = profile.id
        await req.user.save();
        return done(null, req.user);
      } else {
        let user = await User.findOne({ 'googleId': profile.id });
        const profileData = {
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          pictureUrl: profile.pictureUrl
        }
        console.log(profileData, "profileData")
        if (!user) {
          user = await User.create(profileData);
        }
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }
  ));
  
  export default passport;