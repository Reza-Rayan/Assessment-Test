const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const realPersonRouter = require("./routes/realPersonRoutes");
const legalPersonRouter = require("./routes/legalPersonRoutes");
const authRouter = require("./routes/authRoues");

// DB Connect
const dbConnect = require("./utils/dbConnect");
dbConnect();

const app = express();

// Configs
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json("application/json"));
app.use(cookieParser());
dotEnv.config();

app.get("/api", (req, res) => {
  res.json("API Route");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/real-users", realPersonRouter);
app.use("/api/legal-users", legalPersonRouter);

app.listen(5000, () => console.log(`server is running on PORT 5000`));
