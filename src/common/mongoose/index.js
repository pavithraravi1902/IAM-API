import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.DB_URI;

if (!uri) {
  process.exit(1);
}

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;
