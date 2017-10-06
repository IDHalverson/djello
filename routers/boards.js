const { Board, User } = require("../models");

module.exports = () => {
  const express = require("express");
  const boardsRouter = express.Router();

  boardsRouter.post("/", async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const board = await Board.create({ title, description });
      const user = await User.findById(req.user._id);
      user.boards.push(board);
      await user.save();
      res.json(board);
    } catch (e) {
      throw e;
    }
  });

  return boardsRouter;
};
