module.exports = function (req, res, next) {
  if (!req.session.isAuthen) {
    res.redirect("/error");
  }

  next();
};
