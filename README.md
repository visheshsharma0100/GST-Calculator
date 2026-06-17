# GST Calculator

A fast, accurate GST calculator for Indian tax breakdowns — built as a free trial project for **Digital Heroes**.

🔗 **Live Demo:** [gst-calculator-theta-snowy.vercel.app](https://gst-calculator-theta-snowy.vercel.app/)

## Features

- Real-time GST calculation as you type — no extra clicks needed
- Supports all standard Indian GST slabs: **5%, 12%, 18%, 28%**
- Instant breakdown of:
  - GST Amount
  - CGST (Central GST)
  - SGST (State GST)
  - Total Amount (Base Price + GST)
- Clean, responsive UI — works smoothly on mobile, tablet, and desktop
- Input validation with helpful error messages
- One-click Clear/Reset functionality

## Why I built this

As a student, I often deal with invoices, freelance billing, and small purchases where I need a quick GST breakdown. Most existing calculators are cluttered with ads or have outdated, clunky interfaces. I wanted something **fast, clean, and instant** — so I built one.

## Tech Stack

- **React** (Vite)
- **Tailwind CSS v4**
- Pure frontend — no backend, no external APIs
- Deployed on **Vercel**

## Getting Started

Clone the repo and run locally:

```bash
git clone https://github.com/visheshsharma0100/gst-calculator.git
cd gst-calculator
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build for Production

```bash
npm run build
```

## Folder Structure

```
gst-calculator/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Author

**Vishesh Sharma**
📧 visheshsharma00410@gmail.com
💻 [GitHub](https://github.com/visheshsharma0100)

---

Built with ⚡ as part of the Digital Heroes developer trial task.
