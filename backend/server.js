require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

// Express App
const app = express();

//Middlewear
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/workouts", workoutRoutes);

//connect to Database and Then Listen To Requests
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listen For Request
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected To Database And Listening On Port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
