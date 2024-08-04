const express = require("express");
const app = express();
const chalkPromise = import("chalk");
const cors = require("cors");
const dbConnection = require("./database/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const showRoutes = require("./Routes/showRoutes");
const hoshRoutes = require("./Routes/hostRoutes");
require("dotenv").config();
app.use(cors());
const port = process.env.PORT || 5001;
app.use(express.json());
dbConnection();

app.get("/", (req, res) => {
  res.status(200).json({ Status: "SUCCESS", message: "" });
});
//API
app.use("/api/users", userRoutes);
app.use("/api/business", showRoutes);
app.use("/api/show", hoshRoutes);

//SERVER RUNNING
chalkPromise
  .then((module) => {
    const chalk = module.default;
    const aquaBlue = chalk.hex("#00FFFF");

    app.listen(port, () =>
      console.log(
        aquaBlue(
          `THE SERVER IS RUNNING ON: ${chalk.hex("#FFC0CB").bold(port)} !`
        )
      )
    );
  })
  .catch((error) => {
    console.error("Error loading chalk:", error);
  });
