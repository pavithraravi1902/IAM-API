import { authenticator } from 'otplib';
import qrcode from 'qrcode';

// Function to generate a secret
export const generateSecret = () => {
  return authenticator.generateSecret();
};

// Function to generate an OTP URI
export const generateOTPURI = (secret, email) => {
  return authenticator.keyuri(email, 'AuthNexus', secret);
};

// Function to generate a QR code for the OTP URI
export const generateQRCode = async (otpURI) => {
  try {
    return await qrcode.toDataURL(otpURI);
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};

// Function to verify an OTP
export const verifyOTP = (token, secret) => {
  return authenticator.check(token, secret);
};

