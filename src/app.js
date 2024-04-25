import express from "express";

const app = express();

app.use(express.json()); // json parsor

app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});

export default app;
