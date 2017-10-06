const userSummary = user => {
  return {
    user: {
      _id: user._id,
      email: user.email,
      boards: user.boards
    }
  };
};

module.exports = passport => {
  const express = require("express");
  const userRouter = express.Router();

  userRouter.post("/session", (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.json(userSummary(req.user));
    }
    passport.authenticate("local", { session: true }, (err, user, info) => {
      if (!user) {
        return res.json({ error: "There was a problem logging you in." });
      }
      req.login(user, () => {
        const clientData = userSummary(user);
        return res.json(clientData);
      });
    })(req, res, next);
  });

  userRouter.delete("/session", (req, res) => {
    req.logout();
    res.cookie("connect.sid", "", { expires: new Date() });
    res.status(200);
    res.send("logged out");
  });

  return userRouter;
};
