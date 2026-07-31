const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

router.get("/",protect, getTransactions);
router.post("/", protect, addTransaction);
router.put("/:id",protect,  updateTransaction);
router.delete("/:id",protect, deleteTransaction);


module.exports = router;