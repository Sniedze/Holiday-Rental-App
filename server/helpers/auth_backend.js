const isAuthenticated = (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else throw res.status(403);
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuthenticated };
