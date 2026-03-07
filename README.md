# Mohanad ElAdl – AI Engineer Portfolio

> A modern, dark-mode portfolio website for Mohanad ElAdl, AI Engineer at Egypt University of Informatics.  
> Live at: **`https://<your-github-username>.github.io/<repo-name>/`**

---

## 📁 Project Structure

```
project 1/
├── index.html      ← Main HTML (all five sections)
├── styles.css      ← Dark-mode design system + responsive layout
├── script.js       ← Animations, typing effect, form validation
├── hero_bg.png     ← Neural-network hero background image
├── resume.pdf      ← ← ADD YOUR OWN résumé here before deploying
└── README.md       ← This file
```

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

Even if you have never used GitHub before, follow these steps exactly.

### Step 1 – Create a GitHub account (skip if you have one)

1. Go to **[github.com](https://github.com)** and click **Sign up**.
2. Follow the prompts to create a free account.

---

### Step 2 – Create a new repository

1. Once signed in, click the **+** icon in the top-right corner → **New repository**.
2. Fill in:
   - **Repository name:** `portfolio` (or any name you like, e.g. `mohanad-portfolio`)
   - **Visibility:** ✅ **Public**
   - Leave everything else unchecked.
3. Click **Create repository**.

---

### Step 3 – Upload your files

1. On the new repository page, click **uploading an existing file** (or drag-and-drop).
2. Select **all files** in your `project 1` folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `hero_bg.png`
   - `resume.pdf` ← replace the placeholder with your actual PDF
   - `README.md`
3. Scroll down, add a commit message like `"Initial portfolio upload"`, and click **Commit changes**.

---

### Step 4 – Enable GitHub Pages

1. In your repository, click the **Settings** tab (top navigation bar).
2. In the left sidebar, click **Pages**.
3. Under **Branch**, select **`main`** (or `master`) and folder **`/ (root)`**, then click **Save**.
4. GitHub will display a green banner:  
   **"Your site is live at `https://<username>.github.io/portfolio/`"**

> ⏳ It may take **1–3 minutes** for the site to go live. Refresh the page if needed.

---

### Step 5 – Share your link

Copy the URL shown in **Settings → Pages** and share it with recruiters!

Example: `https://mohanadeladl.github.io/portfolio/`

---

## ✏️ Personalising the Site

| What to change | Where |
|---|---|
| Email address | `index.html` → Contact section `<a href="mailto:…">` |
| LinkedIn URL  | `index.html` → Contact + Footer social links |
| GitHub URL    | `index.html` → Contact + Footer social links |
| Résumé file   | Replace `resume.pdf` with your actual CV PDF |
| Project links | `index.html` → Project cards `<a href="#">` → add real URLs |
| Certifications | `index.html` → Skills section `.cert-list` |

---

## 🔧 Local Preview (optional)

If you want to preview the site before uploading:

1. Open **Terminal** (Mac) or **Command Prompt** (Windows).
2. Navigate to the project folder:
   ```bash
   cd "/Users/mohanadeladl/Desktop/year 4/technical writing/project 1"
   ```
3. Start a simple local server:
   ```bash
   python3 -m http.server 8080
   ```
4. Open your browser at **[http://localhost:8080](http://localhost:8080)**.

---

## ♿ Accessibility

- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- All images have descriptive `alt` text
- Full keyboard navigation (Tab, Enter, Space)
- WCAG AA minimum contrast ratios throughout
- ARIA labels on interactive elements
- `prefers-reduced-motion` media query respected

---

## 📜 License

© 2026 Mohanad ElAdl — All rights reserved.
