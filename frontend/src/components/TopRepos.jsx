import styles from "./TopRepos.module.css";

export default function TopRepos({ repos }) {
  const top = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Top Repositories</h3>
      <div className={styles.grid}>
        {top.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className={styles.repo}
          >
            <div className={styles.repoName}>📁 {repo.name}</div>
            <div className={styles.repoDesc}>
              {repo.description || "No description"}
            </div>
            <div className={styles.repoMeta}>
              {repo.language && (
                <span className={styles.lang}>{repo.language}</span>
              )}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
