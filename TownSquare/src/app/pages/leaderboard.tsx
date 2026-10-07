import type { CSSProperties } from "react";
import { createDummyUserRepo } from "@/features/auth/repository/dummyUserRepo";
import type { User } from "@/features/auth/types/User";

const db = createDummyUserRepo();

const sortByLevel = async () => {
  const users = await db.list();

  return [...users].sort((a, b) => b.level - a.level);
};

type UserProp = {
  user: User;
  rankedSpot: number;
};

const UserCard = ({ user, rankedSpot }: UserProp) => {
  return (
    <div style={styles.userCard}>
      <div style={styles.rank}>#{rankedSpot}</div>

      <img
        src={"/assets/icons/svg/UserIcon.svg"}
        alt={`${user.username}'s avatar`}
        style={styles.avatar}
      />

      <div style={styles.userInfo}>
        <h2 style={styles.displayName}>{user.displayName ?? user.username}</h2>

        <p style={styles.username}>@{user.username}</p>

        {user.bio && <p style={styles.bio}>{user.bio}</p>}

        <p style={styles.joined}>Joined: {user.createdAt}</p>
      </div>

      <div style={styles.level}>
        <span style={styles.levelLabel}>LEVEL</span>

        <strong style={styles.levelNumber}>{user.level}</strong>
      </div>
    </div>
  );
};

export const Leaderboard = async () => {
  const usersByLevel = await sortByLevel();

  return (
    <main style={styles.leaderboard}>
      <h1>Leaderboard</h1>

      <p style={styles.description}>Top community members ranked by level</p>

      <ul style={styles.list}>
        {usersByLevel.map((user, index) => (
          <li key={user.id}>
            <UserCard user={user} rankedSpot={index + 1} />
          </li>
        ))}
      </ul>
    </main>
  );
};

/*
 * Styling
 */

const styles: Record<string, CSSProperties> = {
  leaderboard: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  description: {
    color: "#888",
    marginBottom: "25px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: 0,
    margin: 0,
    listStyle: "none",
  },

  userCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",

    padding: "16px 20px",

    backgroundColor: "#3f1946",
    border: "1px solid #333",
    borderRadius: "10px",

    color: "white",
  },

  rank: {
    width: "50px",

    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },

  avatar: {
    width: "60px",
    height: "60px",

    borderRadius: "50%",
    objectFit: "cover",

    backgroundColor: "#292929",
    border: "2px solid #444",
  },

  userInfo: {
    flex: 1,
  },

  displayName: {
    margin: 0,
    fontSize: "18px",
  },

  username: {
    margin: "4px 0",
    color: "#999",
  },

  bio: {
    margin: "8px 0",
    color: "#ccc",
    fontSize: "14px",
  },

  joined: {
    margin: 0,
    color: "#666",
    fontSize: "12px",
  },

  level: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    minWidth: "60px",
    padding: "8px 16px",

    backgroundColor: "#252525",
    border: "1px solid #383838",
    borderRadius: "8px",
  },

  levelLabel: {
    color: "#888",
    fontSize: "10px",
    letterSpacing: "1px",
  },

  levelNumber: {
    fontSize: "24px",
  },
};
