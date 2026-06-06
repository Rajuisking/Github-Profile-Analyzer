import axios from "axios";

const BASE = "https://api.github.com";

// Fetch user profile
export const fetchUser = (username) =>
  axios.get(`${BASE}/users/${username}`).then((r) => r.data);

// Fetch all repos
export const fetchRepos = (username) =>
  axios.get(`${BASE}/users/${username}/repos?per_page=100&sort=updated`).then((r) => r.data);

// Calculate top languages from repos
export const calcLanguages = (repos) => {
  const map = {};
  repos.forEach((r) => {
    if (r.language) map[r.language] = (map[r.language] || 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
};

// Calculate recruiter score out of 100
export const calcScore = (user, repos) => {
  let score = 0;
  const reasons = [];

  // Has avatar
  if (user.avatar_url) { score += 5; reasons.push("✅ Has profile picture (+5)"); }

  // Has bio
  if (user.bio) { score += 10; reasons.push("✅ Has bio (+10)"); }
  else reasons.push("❌ No bio (missing +10)");

  // Has location
  if (user.location) { score += 5; reasons.push("✅ Has location (+5)"); }
  else reasons.push("❌ No location (missing +5)");

  // Has website/blog
  if (user.blog) { score += 10; reasons.push("✅ Has portfolio/website (+10)"); }
  else reasons.push("❌ No website (missing +10)");

  // Repo count
  if (user.public_repos >= 10) { score += 15; reasons.push("✅ 10+ repos (+15)"); }
  else if (user.public_repos >= 5) { score += 8; reasons.push("⚠️ 5+ repos (+8) — aim for 10+"); }
  else reasons.push("❌ Less than 5 repos (missing +15)");

  // Followers
  if (user.followers >= 50) { score += 15; reasons.push("✅ 50+ followers (+15)"); }
  else if (user.followers >= 10) { score += 8; reasons.push("⚠️ 10+ followers (+8)"); }
  else reasons.push("❌ Less than 10 followers (missing +15)");

  // Has README repos (repos with description)
  const withDesc = repos.filter((r) => r.description).length;
  if (withDesc >= 5) { score += 15; reasons.push("✅ 5+ repos have descriptions (+15)"); }
  else if (withDesc >= 2) { score += 8; reasons.push("⚠️ Some repos have descriptions (+8)"); }
  else reasons.push("❌ No repo descriptions (missing +15)");

  // Stars
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  if (totalStars >= 10) { score += 10; reasons.push(`✅ ${totalStars} total stars (+10)`); }
  else reasons.push(`❌ Only ${totalStars} stars (missing +10)`);

  // Recent activity (pushed in last 30 days)
  const recent = repos.filter((r) => {
    const days = (Date.now() - new Date(r.pushed_at)) / 86400000;
    return days <= 30;
  }).length;
  if (recent >= 3) { score += 15; reasons.push("✅ Active recently — 3+ repos updated (+15)"); }
  else if (recent >= 1) { score += 8; reasons.push("⚠️ Some recent activity (+8)"); }
  else reasons.push("❌ No recent activity (missing +15)");

  return { score: Math.min(score, 100), reasons };
};
