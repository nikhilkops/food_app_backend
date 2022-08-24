const express = require("express"); // to use express in project
const app = express();
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const planRouter = require("./routes/planRoutes");
//token name i =s JWT and mechanisim is cookie
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan", planRouter);

app.use(function (req, res) {
  res.send("<h1>Backend API</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Started at Port 3000");
});
