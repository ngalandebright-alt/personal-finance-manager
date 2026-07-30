const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
        },

        amount: {
            type: Number,
            require: true,
        },

        type: {
            type: String,
            enum: ["income", "expense"],
            require: true,
        },

        category: {
            type: String,
            require: true,
        } ,

        date: {
            type: String,
            require: true,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);