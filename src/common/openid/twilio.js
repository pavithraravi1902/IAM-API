// import twilio from "twilio";
// import dotenv from "dotenv";

// dotenv.config();

// function sendMessage() {
//   const accountSid = "ACde86a482e519c7f9c3f7c9a3d9105141";
//   const authToken = "[AuthToken]";
//   const client = twilio(accountSid, authToken);

//   client.verify.v2
//     .services("VA1773813f779b9faf388eec351a418a6b")
//     .verifications.create({ to: "+918667443291", channel: "sms" })
//     .then((verification) => console.log(verification.sid))
//     .catch((error) => console.error('Failed to send message:', error));
// }

// export default sendMessage;

// sendMessage();
