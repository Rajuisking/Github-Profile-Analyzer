import styles from "./RecruiterScore.module.css";

export default function RecruiterScore({ score, reasons }) {
  const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
  const label = score >= 70 ? "Strong Profile 🔥" : score >= 40 ? "Average Profile ⚠️" : "Needs Work ❌";

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Recruiter Score</h3>
      <div className={styles.scoreWrap}>
        <svg viewBox="0 0 120 120" className={styles.ring}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
          <text x="60" y="56" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>{score}</text>
          <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#94a3b8">/100</text>
        </svg>
        <div>
          <div className={styles.label} style={{ color }}>{label}</div>
          <p className={styles.sub}>Based on GitHub profile completeness & activity</p>
        </div>
      </div>
      <div className={styles.reasons}>
        {reasons.map((r, i) => (
          <div key={i} className={styles.reason}>{r}</div>
        ))}
      </div>
    </div>
  );
}
