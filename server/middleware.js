module.exports = {
  startMongo: mongoose => (req, res, next) => {
    if (mongoose.connection.readyState) {
      next();
    } else {
      require("../mongo")().then(() => {
        next();
      });
    }
  },
  logConnections: (req, res, next) => {
    console.log("incoming connection...");
    next();
  },
  handleCors: (req, res, next) => {
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    // );
    next();
  }
};
