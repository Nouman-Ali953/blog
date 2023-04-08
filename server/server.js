import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import Connect from "./database/connect.js";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

import Router from "./routes/route.js";
app.use("/", Router);

app.listen(port, () => {
  console.log(`Listening to the port ${port} ✈️`);
});

const URL =process.env.MONGODB_URL || `mongodb+srv://nauman:blogsite@blogsite.cmwpwxn.mongodb.net/test`;

Connect(URL);
