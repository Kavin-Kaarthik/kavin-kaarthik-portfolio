# Kavin Kaarthik — Portfolio

A dark-themed, interactive personal portfolio with:
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for scroll animations
- **Cursor tracking** (custom cursor + 3D card tilt + parallax orbs)
- **Particle canvas** (animated floating nodes with connections)
- **Typewriter effect** in the hero section
- **Node.js + Express** backend
- **Nodemailer** — actually sends email when the contact form is submitted

---

## 📁 Structure

```
kavin-portfolio/
├── public/
│   └── index.html       ← Full portfolio (Tailwind + GSAP + JS)
├── server.js            ← Express + Nodemailer backend
├── package.json
├── .env.example         ← Copy to .env and fill in credentials
└── README.md
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```
EMAIL_USER=sikavin137@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=sikavin137@gmail.com
PORT=3000
```

> **Getting a Gmail App Password:**
> 1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
> 2. Enable 2-Step Verification
> 3. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 4. Create an app password for "Mail" → copy the 16-char password
> 5. Paste it as `EMAIL_PASS` in your `.env`

### 3. Run
```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

### 4. Open
```
http://localhost:3000
```

---

## ✨ Features

| Feature | Description |
|---|---|
| Custom cursor | Dot + ring, lags behind smoothly |
| Card 3D tilt | Every card tilts toward cursor (3D perspective) |
| Parallax orbs | Background glows follow mouse |
| Particle network | Canvas-based animated nodes |
| Typewriter | Cycles through roles in hero |
| GSAP scroll | Sections fade+slide in on scroll |
| Skill bars | Animated on scroll into view |
| Contact form | Sends real email via Nodemailer + auto-reply to sender |

---

## 🌐 Deployment (Vercel / Railway / Render)

Set environment variables in your hosting dashboard:
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_TO`

Then deploy — the Express server serves the `public/` folder statically.

---

## 📬 Contact
**Kavin Kaarthik** · sikavin137@gmail.com · [GitHub](https://github.com/Kavin-Kaarthik) · [LinkedIn](https://www.linkedin.com/in/kavin-kaarthik-492141293)
