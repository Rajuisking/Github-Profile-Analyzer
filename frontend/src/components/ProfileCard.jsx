import styles from "./ProfileCard.module.css";

export default function ProfileCard({ user }) {
  return (
    <div className={styles.card}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name || user.login}</h2>
        <p className={styles.handle}>@{user.login}</p>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
        <div className={styles.meta}>
          {user.location && <span>📍 {user.location}</span>}
          {user.company && <span>🏢 {user.company}</span>}
          {user.blog && (
            <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank" rel="noreferrer">
              🔗 Portfolio
            </a>
          )}
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{user.public_repos}</span>
            <span className={styles.statLbl}>Repos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{user.followers}</span>
            <span className={styles.statLbl}>Followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{user.following}</span>
            <span className={styles.statLbl}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
