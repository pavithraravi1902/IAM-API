import jwt from 'jsonwebtoken';
function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, 'https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ');
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

export default verifyToken;