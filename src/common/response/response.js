export const handleResponse = (
  promise,
  res,
  successMessage,
  errorMessage = "Internal server error",
  successStatus = 200,
  errorStatus = 500
) => {
  promise
    .then((result) => {
      res.status(successStatus).json({ message: successMessage, result });
    })
    .catch((error) => {
      res
        .status(error.status || errorStatus)
        .json({ message: error.message || errorMessage });
    });
};

export const handleServiceError = (promise) => {
  return promise.catch((error) => {
    throw new Error(error.message || "Internal server error");
  });
};
