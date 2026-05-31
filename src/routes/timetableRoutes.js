const express = require("express");
const router = express.Router();
const { getAllEntries, createEntry, updateEntry, deleteEntry } = require("../controllers/timetableController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getAllEntries);
router.post("/", protect, adminOnly, createEntry);
router.put("/:id", protect, adminOnly, updateEntry);
router.delete("/:id", protect, adminOnly, deleteEntry);

module.exports = router;
