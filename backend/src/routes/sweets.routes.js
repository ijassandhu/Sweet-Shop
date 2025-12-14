const express = require("express");
const router = express.Router();

const {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweets.controller");

const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// Protected routes
router.post("/", authMiddleware, adminMiddleware, addSweet);
router.get("/", authMiddleware, getSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

// Inventory
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

module.exports = router;
