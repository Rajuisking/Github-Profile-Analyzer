import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>🔍 GitHub Analyzer</div>
      <a
        href="https://github.com/Rajuisking"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        My GitHub →
      </a>
    </nav>
  );
}
