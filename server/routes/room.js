const express = require("express");
const router = express.Router();

// controller
const {
  create,
  read,
  update,
  remove,
  list,
  handleDateFilter,
} = require("../controllers/room");

// routes
router.post("/room", create);
router.get("/rooms", list);
router.get("/room/:slug", read);
router.put("/room/:slug", update);
router.delete("/room/:slug", remove);
router.post("/date/filter", handleDateFilter);

module.exports = router;
