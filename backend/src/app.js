import express from "express";
import cors from "cors";
// import taskRouter from "./routes/task.route.js";
import taskRoutes from "./routes/task.route.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1", taskRoutes);

// app.get("/api/v1/get-task", (req, res) => {
//   res.send("Well hello there");
// });
console.log(process.env.CORS_ORIGIN, "origin response");

// app.use("/api/v1", taskRouter);

export { app };
