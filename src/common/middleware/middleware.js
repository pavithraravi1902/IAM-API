// import jwt from 'jsonwebtoken';
// const SECRET_KEY = process.env.JWT_SECRET_KEY; // Ensure you have this set in your environment variables

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Access token is missing or invalid' });
//   }

//   jwt.verify(token, "jwtSecret", (err, user) => {
//     if (err) {
//       console.error('Error during authentication:', err);
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// export default authenticate;
