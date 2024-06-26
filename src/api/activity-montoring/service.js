import Log from "./model.js";

export const createLog = async (user, method, url) => {
  try {
    const log = Log({ user, method, url });
    await log.save();
  } catch (error) {
    throw error;
  }
};

export const getLogs = async (filter = {}, options = {}) => {
  try {
    const logs = await Log.find(filter, null, options).exec();
    return logs;
  } catch (error) {
    throw error;
  }
};
