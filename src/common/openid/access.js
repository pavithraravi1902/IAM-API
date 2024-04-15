export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); 
  }
  res.status(403).send('Forbidden'); 
}

export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    return next(); 
  }
  res.status(403).send('Forbidden'); 
}
