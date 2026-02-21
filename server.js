require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log("Erro Mongo:", err));

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT || 5000, () =>
    console.log("Servidor rodando...")
);