const checkToken = (req, res, next) => {
  let token = req.header["token"];
  if (token.startsWith("bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
  }
};
