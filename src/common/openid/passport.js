import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import bcrypt from "bcrypt";
import { User } from "../../api/auth/model.js";
import { jwtSecretKey } from "../../common/openid/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv-safe'
dotenv.config();

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

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false);
        }
        if (user.requiresMFA) {
          const otp = ''; 
          if (!otp || !verifyOTP(user, otp)) {
            return done(null, false, { message: 'Invalid OTP' });
          }
        }
        const payload = {
          userId: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
        await User.findOneAndUpdate(
          { token: token },
        );
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  try {
    if (!user || !user.id) {
      throw new Error("Invalid user object");
    }
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;