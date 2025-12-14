const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const sweetsRoutes = require("./src/routes/sweets.routes"); // <-- IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

// Debug
console.log("Auth routes loaded:", authRoutes);
console.log("Sweets routes loaded:", sweetsRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes); // <-- IMPORTANT

app.get("/", (req, res) => {
  res.send("Sweet Shop API Running...");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
