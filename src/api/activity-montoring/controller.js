import { createLog, getLogs } from "./service.js";

export const logRequest = async (req, res, next) => {
  const { method, url } = req;
  const user = req.user ? req.user.username : "guest";

  try {
    await createLog(user, method, url);
    next();
  } catch (error) {
    next(error);
  }
};

export const fetchLogs = async (req, res) => {
  const { user, method, url, startDate, endDate } = req.query;

  const filter = {};
  if (user) filter.user = user;
  if (method) filter.method = method;
  if (url) filter.url = new RegExp(url, "i");
  if (startDate || endDate) {
    filter.timestamp = {};
    if (startDate) filter.timestamp.$gte = new Date(startDate);
    if (endDate) filter.timestamp.$lte = new Date(endDate);
  }

  try {
    const logs = await getLogs(filter);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
