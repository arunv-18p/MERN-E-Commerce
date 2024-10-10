const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { connectToDB } = require("./db");
const handleErrors = require("./middlewares/handleErrors.js");

const productRoute = require("./routes/productRoute.js");
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const paymentRoute = require("./routes/paymentRoute.js");

const app = express();

dotenv.config();

connectToDB();

app.use(cors({
  origin: process.env.ORIGIN,
  methods: 'POST,PUT,DELETE,GET',
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/v1", productRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", async (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
}

app.get("/", async (req, res) => {
    res.send("server working");
});


app.use(handleErrors);

app.listen(process.env.SERVER_PORT, () => {
    console.log("server started successfully");
});
