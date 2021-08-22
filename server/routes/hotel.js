const express = require("express");
const router = express.Router();

// controller
const {
  create,
  read,
  update,
  remove,
  list,
  handleQuery,
} = require("../controllers/hotel");

// routes
router.post("/hotel", create);
router.get("/hotels", list);
router.get("/hotel/:slug", read);
router.put("/hotel/:slug", update);
router.delete("/hotel/:slug", remove);
router.post("/search/filter", handleQuery);

module.exports = router;
