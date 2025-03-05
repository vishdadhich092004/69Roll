import express from "express";
import diceRoutes from "./routes/dice.routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("69 🎲 says die :)");
});

app.use("/api/v1", diceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
