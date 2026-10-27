"use server";
import { CSSProperties } from "react";
import { UserCard } from "./UserCard";
import type { User } from "@/features/auth/types/User";
import { userService } from "@/features/auth/service/user-service";
export const UserCardList = async () => {
  const usersByLevel = await userService.sortByLevel();
  return (
    <div>
      <ul>
        {usersByLevel.map((user, index) => (
          <li key={user.id ?? index}>
            <a href={`/user/${user.name}`}>
              <UserCard user={user} rankedSpot={index + 1} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCardList;
