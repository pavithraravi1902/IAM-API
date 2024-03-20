export const verifyOTP = (userInputOTP, generatedOtp) => {
  return userInputOTP === generatedOtp;
};
