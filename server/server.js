require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DB = process.env.MONGODB_URI;

const port = 8000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./config/mongoose.config")(DB);

// routes
require("./routes/user.routes")(app);
require("./routes/uploads.routes")(app);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
