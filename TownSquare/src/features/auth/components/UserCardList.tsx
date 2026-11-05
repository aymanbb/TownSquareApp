"use server";
import { CSSProperties } from "react";
import { UserCard } from "./UserCard";
import type { User } from "@/features/auth/types/User";
import { userService } from "@/features/auth/service/user-service";
import { ScrollView } from "@/features/global/components/ScrollView";
export const UserCardList = async () => {
  const usersByLevel = await userService.sortByLevel();
  return (
    <div>
      <ScrollView className={"h-absolute h-140 w-full"}>
        <ul className="gap-12 flex flex-col">
          {usersByLevel.map((user, index) => (
            <li key={user.id ?? index}>
              <a href={`/user/${user.name}`}>
                <UserCard user={user} rankedSpot={index + 1} />
              </a>
            </li>
          ))}
        </ul>
      </ScrollView>
    </div>
  );
};

export default UserCardList;
