import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../../api/auth/model.js";
import { Types } from 'mongoose';
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
  console.log(user, "serializeUser");
  done(null, { id: user.id, email: user.email, role: user.role });
});

passport.deserializeUser(async (id, done) => {
  console.log(id, "serializeId");
  try {
    const objectId = new ObjectId(id);
    const user = await User.findById(objectId);
    console.log(user, "serializeUser");
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
