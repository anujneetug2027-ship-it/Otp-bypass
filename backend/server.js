import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Proxy backend running" });
});

/*
  This route:
  1. Receives phone from Site-A
  2. Forwards it to your SCHOOL project /send-otp
  3. Returns success ONLY if Twilio was triggered
*/
app.post("/forward-and-send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone || !phone.startsWith("+91")) {
    return res.json({ success: false, message: "Invalid phone format" });
  }

  try {
    const response = await fetch(
      "https://otp-varification-bice.vercel.app/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      }
    );

    const data = await response.json();
    console.log("School backend response:", data);

    if (response.ok && data.success) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }

  } catch (err) {
    console.error("Forwarding error:", err);
    return res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Proxy backend running on port", PORT);
});
