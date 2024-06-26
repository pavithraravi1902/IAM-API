import bcrypt from "bcrypt";
import { Types } from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../../api/auth/model.js";
const { ObjectId } = Types;

passport.use(
  new LocalStrategy(
    { usernameField: "email", PasswordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        // Validate password
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
    const objectId = new ObjectId(id);
    const user = await User.findById(objectId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
