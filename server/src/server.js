require("dotenv").config();

console.log("Mongo URI:", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/transactions", transactionRoutes);


app.get("/", (req, res) => {
    res.json({ 
        massage: "Finance Manager API is running"
});
});

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}` );
});
