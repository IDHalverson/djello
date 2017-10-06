const { List, Board } = require("../models");

module.exports = () => {
  const express = require("express");
  const listsRouter = express.Router();

  listsRouter.post("/", async (req, res, next) => {
    try {
      const { title, description, boardId } = req.body;
      const list = await List.create({ title, description });
      const board = await Board.findById(boardId);
      board.lists.push(list);
      await board.save();
      res.json(list);
    } catch (e) {
      throw e;
    }
  });

  return listsRouter;
};
