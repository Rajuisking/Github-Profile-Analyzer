import { useState } from "react";
import toast from "react-hot-toast";
import { fetchUser, fetchRepos, calcLanguages, calcScore } from "../utils/github";
import ProfileCard from "../components/ProfileCard";
import RecruiterScore from "../components/RecruiterScore";
import LanguageChart from "../components/LanguageChart";
import TopRepos from "../components/TopRepos";
import styles from "./Home.module.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setData(null);
    try {
      const [user, repos] = await Promise.all([
        fetchUser(username.trim()),
        fetchRepos(username.trim()),
      ]);
      const languages = calcLanguages(repos);
      const { score, reasons } = calcScore(user, repos);
      setData({ user, repos, languages, score, reasons });
    } catch (err) {
      if (err.response?.status === 404) toast.error("GitHub user not found!");
      else if (err.response?.status === 403) toast.error("GitHub rate limit hit. Try again in a minute.");
      else toast.error("Something went wrong. Check the username.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") analyze(); };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>GitHub Profile Analyzer</h1>
        <p className={styles.heroSub}>
          Enter any GitHub username → get recruiter score, top languages, activity insights
        </p>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter GitHub username (e.g. Rajuisking)"
            className={styles.input}
          />
          <button onClick={analyze} disabled={loading} className={styles.btn}>
            {loading ? "Analyzing..." : "Analyze →"}
          </button>
        </div>
        <div className={styles.examples}>
          Try:{" "}
          {["torvalds", "gaearon", "sindresorhus"].map((u) => (
            <button key={u} className={styles.exBtn} onClick={() => { setUsername(u); }}>
              {u}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Fetching GitHub data...</p>
        </div>
      )}

      {data && (
        <div className={styles.results}>
          <ProfileCard user={data.user} />
          <div className={styles.grid2}>
            <RecruiterScore score={data.score} reasons={data.reasons} />
            <LanguageChart languages={data.languages} />
          </div>
          <TopRepos repos={data.repos} />
        </div>
      )}
    </div>
  );
}
