import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import pool from "./db/pool.js";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import availabilityRoutes from "./routes/availabilty.js";
import bookRoutes from "./routes/book.js";
const app = express();
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // localhost
      sameSite: "lax", // IMPORTANT for OAuth redirect
    },
  })
);
app.use(
  cors({
    origin: true,
    // process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/availability", availabilityRoutes);
app.use("/book", bookRoutes);

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Databse connection failed" });
  }
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
