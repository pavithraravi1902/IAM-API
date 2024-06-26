const sessionTimeoutMiddleware = (req, res, next) => {
  if (req.session && req.session.expires && Date.now() > req.session.expires) {
    return res.redirect("/users/login");
  }
  req.session.expires = Date.now() + 10000;
  next();
};

export default sessionTimeoutMiddleware;
