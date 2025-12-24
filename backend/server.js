const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !phone.startsWith("+91")) {
      return res.status(400).json({ success: false, error: "Invalid phone format" });
    }

    const response = await fetch(
      "https://otp-varification-bice.vercel.app/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      }
    );

    const text = await response.text();
    console.log("School backend response:", text);

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: "School backend rejected request"
      });
    }

    // If Twilio works, backend usually responds with success message
    return res.json({ success: true });

  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("OTP proxy backend running on port", PORT);
});
