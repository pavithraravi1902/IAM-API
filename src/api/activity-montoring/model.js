import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  user: String,
  method: String,
  url: String,
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
