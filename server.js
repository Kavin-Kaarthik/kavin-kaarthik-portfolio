// ─────────────────────────────────────────────────────────────────────────────
//  KAVIN PORTFOLIO — Backend Server
//  Express + Nodemailer  |  node server.js
// ─────────────────────────────────────────────────────────────────────────────
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rate-limit the contact endpoint (max 5 requests / 15 min per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many requests — try again later." },
});

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email and message are required." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
    // ── Mail to Kavin ──────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "sikavin137@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject || "New message"} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family:'Segoe UI',sans-serif;background:#080c10;color:#e8edf2;padding:32px;">
          <div style="max-width:560px;margin:0 auto;border:1px solid #1e2a38;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#00e5ff22,#7b61ff22);padding:28px 32px;border-bottom:1px solid #1e2a38;">
              <h1 style="margin:0;font-size:22px;color:#00e5ff;letter-spacing:-0.5px;">New Portfolio Message</h1>
              <p style="margin:6px 0 0;color:#6b7c8f;font-size:13px;">Someone reached out through your portfolio</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;color:#6b7c8f;font-size:12px;width:90px;text-transform:uppercase;letter-spacing:.1em;">Name</td>
                  <td style="padding:8px 0;color:#e8edf2;font-size:14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6b7c8f;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00e5ff;text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6b7c8f;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Subject</td>
                  <td style="padding:8px 0;color:#e8edf2;font-size:14px;">${subject || "—"}</td>
                </tr>
              </table>
              <div style="margin-top:20px;padding:20px;background:#0d1117;border:1px solid #1e2a38;border-radius:8px;">
                <p style="margin:0;font-size:13px;color:#6b7c8f;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;">Message</p>
                <p style="margin:0;font-size:14px;line-height:1.8;color:#e8edf2;white-space:pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="padding:16px 32px;background:#0d1117;border-top:1px solid #1e2a38;text-align:center;">
              <p style="margin:0;font-size:11px;color:#3a4a5a;">Kavin Kaarthik — Portfolio Contact System</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // ── Auto-reply to sender ───────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Kavin Kaarthik" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Got your message! — Kavin Kaarthik",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family:'Segoe UI',sans-serif;background:#080c10;color:#e8edf2;padding:32px;">
          <div style="max-width:560px;margin:0 auto;border:1px solid #1e2a38;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#00e5ff22,#7b61ff22);padding:28px 32px;border-bottom:1px solid #1e2a38;">
              <h1 style="margin:0;font-size:22px;color:#00e5ff;">Hey ${name}! 👋</h1>
            </div>
            <div style="padding:28px 32px;font-size:14px;line-height:1.9;color:#b0bec8;">
              <p>Thanks for reaching out through my portfolio — I received your message and I'll get back to you as soon as possible.</p>
              <p>In the meantime, feel free to check out my projects on GitHub or connect on LinkedIn.</p>
              <div style="margin:24px 0;display:flex;gap:12px;">
                <a href="https://github.com/Kavin-Kaarthik" style="display:inline-block;padding:10px 20px;background:#00e5ff;color:#080c10;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px;">GitHub</a>
                <a href="https://www.linkedin.com/in/kavin-kaarthik-492141293" style="display:inline-block;padding:10px 20px;border:1px solid #1e2a38;color:#e8edf2;text-decoration:none;border-radius:6px;font-size:13px;">LinkedIn</a>
              </div>
              <p style="color:#6b7c8f;">— Kavin Kaarthik<br>B.Tech IT @ CIT, Coimbatore</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false, message: "Failed to send email. Please try again." });
  }
});

// ── Catch-all → serve portfolio ───────────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🚀  Kavin Portfolio running at http://localhost:${PORT}\n`);
});
