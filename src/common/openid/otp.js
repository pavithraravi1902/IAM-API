import nodemailer from "nodemailer";

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
  return otp.toString();
};

export const sendOTPByEmail = (email) => {
  const otpValue = generateOtp();
  console.log(otpValue, "otpValue");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pavithraravi1902@gmail.com",
      pass: "sxtd tzwb lxba sbcq", // google project password
    },
  });

  const mailOptions = {
    from: "pavithraravi1902@gmail.com",
    to: email,
    subject: "Your OTP for MFA",
    text: `Your OTP is: ${otpValue}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("not send");
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const verifyOTP = (userInputOTP) => {
  console.log(userInputOTP);
  const otpValue = generateOtp();
  console.log(otpValue);
  return userInputOTP === otpValue;
};
