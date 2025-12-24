import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/forward-and-send-otp", async (req, res) => {
  const { phone } = req.body;

  try {
    const response = await fetch(
      "https://otp-varification-bice.vercel.app/send-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      }
    );

    const rawText = await response.text();
    console.log("Raw response from school site:", rawText);

    // If response is HTML, OTP route is not public
    if (!rawText.trim().startsWith("{")) {
      return res.json({
        success: false,
        reason: "OTP endpoint is not publicly accessible"
      });
    }

    const data = JSON.parse(rawText);

    if (data.success) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }

  } catch (err) {
    console.error("Proxy error:", err);
    return res.json({ success: false, error: "Proxy failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Proxy backend running");
});
