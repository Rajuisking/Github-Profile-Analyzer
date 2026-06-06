# 🔍 GitHub Profile Analyzer

Analyze any GitHub profile — get a **Recruiter Score**, top languages, repo stats, and activity insights.

## 🛠 Tech Stack
- **React** — UI components
- **Vite** — fast dev server
- **Chart.js + react-chartjs-2** — doughnut chart for languages
- **Axios** — API calls
- **GitHub REST API** — free, no auth needed for public profiles
- **CSS Modules** — scoped styling per component

## 📁 Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← top navigation bar
│   │   ├── Navbar.module.css
│   │   ├── ProfileCard.jsx     ← user avatar, bio, stats
│   │   ├── ProfileCard.module.css
│   │   ├── RecruiterScore.jsx  ← score ring + breakdown
│   │   ├── RecruiterScore.module.css
│   │   ├── LanguageChart.jsx   ← doughnut chart
│   │   ├── LanguageChart.module.css
│   │   ├── TopRepos.jsx        ← top 6 repos grid
│   │   └── TopRepos.module.css
│   ├── pages/
│   │   ├── Home.jsx            ← search bar + assembles all components
│   │   └── Home.module.css
│   ├── utils/
│   │   └── github.js           ← all GitHub API calls + score logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 How to Run
```bash
npm install
npm run dev
```
Open http://localhost:5173

## 🌐 How to Deploy (Vercel — free)
```bash
npm install -g vercel
vercel
```
Done. You get a live link like `github-analyzer.vercel.app`

## 📝 Resume Bullet Points
- Built a GitHub Profile Analyzer using React and GitHub REST API that calculates a recruiter score based on profile completeness, repo activity, and contribution patterns.
- Implemented dynamic language breakdown charts with Chart.js and real-time profile insights with zero backend required.
