
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

// receive phone number
app.post("/submit-number", (req, res) => {
  const { phone } = req.body;

  console.log("📞 Phone number received:", phone);

  if (!phone) {
    return res.json({ success: false });
  }

  // just confirming receipt
  return res.json({
    success: true,
    received: phone
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
