import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.listen(PORT, () => console.log("SERVER RUNNING AT PORT 5000"));
