if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

//Importing the Routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

//Conecting to DB
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Conected to Mongoose"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10 mb", extended: false }));

//Using the Routes
app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);
