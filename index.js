import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API food menu");
});

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log("database is connected");
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("useFindAndModify", false);
