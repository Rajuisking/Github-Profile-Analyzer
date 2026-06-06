import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./LanguageChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#1a56db","#10b981","#f59e0b","#ef4444","#8b5cf6","#14b8a6"];

export default function LanguageChart({ languages }) {
  const data = {
    labels: languages.map(([lang]) => lang),
    datasets: [{
      data: languages.map(([, count]) => count),
      backgroundColor: COLORS.slice(0, languages.length),
      borderWidth: 2,
    }]
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Top Languages</h3>
      <div className={styles.chartWrap}>
        <Doughnut data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "right", labels: { font: { size: 12 }, boxWidth: 12 } } }
        }} />
      </div>
      <div className={styles.list}>
        {languages.map(([lang, count], i) => (
          <div key={lang} className={styles.langRow}>
            <span className={styles.dot} style={{ background: COLORS[i] }} />
            <span className={styles.langName}>{lang}</span>
            <span className={styles.langCount}>{count} repos</span>
          </div>
        ))}
      </div>
    </div>
  );
}
