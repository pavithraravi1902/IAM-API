// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const accountSid = "ACde86a482e519c7f9c3f7c9a3d9105141";
// const authToken = "4931b8f1375d02924b9c15c894be7900";

// // const client = twilio(accountSid, authToken);
// // const fromNumber = '+918056324658'

// // client.messages
// // .create({
// //     body: 'Hello from twilio-node',
// //     to: '+918667443291',
// //     from: fromNumber, // Text your number
// //      // From a valid Twilio number
// //   })
// //   .then((message) => console.log('Message sent. SID:', message.sid))
// //   .catch((error) => console.error('Error sending message:', error));


// if (!accountSid || !authToken) {
//   throw new Error("Twilio account SID and auth token are required.");
// }

// const client = twilio(accountSid, authToken);

// client.region = 'au1';
// client.edge = 'sydney';
// client.logLevel = 'debug';

// console.log("Twilio client initialized");

// function sendMessage() {
//   client.messages
//     .create({
//       body: 'Hello from twilio-node',
//       to: '+918667443291', // Text your number
//       from: '+918056324658', // From a valid Twilio number
//     })
//     .then((message) => {
//       console.log('Message sent successfully with SID:', message.sid);
//     })
//     .catch((error) => {
//       console.error('Failed to send message:', error);
//     });
// }

// export default sendMessage;

// // Optional: automatically call sendMessage when this file is executed
// sendMessage();
