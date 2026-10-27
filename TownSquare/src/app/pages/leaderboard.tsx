import type { CSSProperties } from "react";
import { userService } from "@/features/auth/service/user-service";
import type { User } from "@/features/auth/types/User";
import { UserCardList } from "@/features/auth/components/UserCardList";
export function Leaderboard() {
  return (
    <>
      <header className="mb-8 flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          {/* Pokal-ikon */}
          <img
            src="/assets/icons/svg/Golden_Crown.svg"
            alt="Trophy icon"
            className="h-20 w-20 shrink-0 text-[#FFAA00] drop-shadow-[2px_2px_0_#3F2A00]"
          />

          <h1 className="m-0 text-4xl uppercase tracking-wider text-[#FFFF55] [text-shadow:3px_3px_0_#3F3F15] sm:text-5xl">
            Leaderboard
          </h1>
        </div>

        <div className="mt-3 h-1 w-40 bg-gradient-to-r from-transparent via-[#FFAA00] to-transparent" />

        <p className="mt-3 text-sm tracking-wide text-[#AAAAAA]">
          Top community members ranked by level
        </p>
      </header>
      <main>
        <UserCardList />
      </main>
    </>
  );
}

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
