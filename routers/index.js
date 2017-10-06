module.exports = passport => (req, res, next) => {
  switch (req.params.param) {
    case "users":
      return require("./user")(passport)(req, res, next);
    case "boards":
      return require("./boards")()(req, res, next);
    case "lists":
      return require("./lists")()(req, res, next);
    case "cards":
      return require("./cards")()(req, res, next);
  }
};
