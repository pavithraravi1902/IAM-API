// import otp from "otp";
// import nodemailer from "nodemailer";

// const generateSecretKey = () => {
//   return otp({ digits: 6, period: 30 }).totp.secret;
// };

// const sendOTPByEmail = (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Your OTP for MFA',
//     text: `Your OTP is: ${otp}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// const verifyOTP = (inputOTP, secretKey) => {
//   const otpToken = otp({ digits: 6, secret: secretKey }).totp();
//   return otpToken === inputOTP;
// };

// const userSecretKey = generateSecretKey();
// const userOTP = otp({ digits: 6, secret: userSecretKey }).totp();
// sendOTPByEmail('user@example.com', userOTP);
// const userInputOTP = '123456';
// const isOTPValid = verifyOTP(userInputOTP, userSecretKey);
// if (isOTPValid) {
//   console.log('OTP is valid. Allow user to login.');
// } else {
//   console.log('Invalid OTP. Deny login.');
// }

import otp from "otp";
import nodemailer from "nodemailer";

const generateOtp = ()=>{
    return otp({digits:6, period: 30}).totp.secret
}

export const sendOTPByEmail = (email, otp) => {
    console.log("otp function initiated", otp)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pavithraravi1902@gmail.com',
          pass: 'sxtd tzwb lxba sbcq',
        },
      });
    
      const mailOptions = {
        from: 'pavithraravi1902@gmail.com',
        to: email,
        subject: 'Your OTP for MFA',
        text: `Your OTP is: ${otp}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("not send")
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    };