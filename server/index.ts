import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/students", require("./router/students.routes"));
app.use("/auth", require("./router/auth.routes"));

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});