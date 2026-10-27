"use client";
import React from "react";
import { getUserByName } from "@/features/auth/api/user-api";
import type { User } from "@/features/auth/types/User";
import { useEffect, useState } from "react";
type UserProps = {
  userId?: string;
  userName: string;
};

// This is a placeholder for the User page. You can replace this with your actual User page content.
export const UserPage = ({ userName }: UserProps) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserByName(userName);
      console.log("Fetched user:", result);
      setUser(result);
    };
    fetchUser();
  }, [userName]);
  return (
    <>
      <h1>UserPage</h1>
      {user && (
        <div>
          <p>Display Name: {user.displayName}</p>
          <p>Username: {user.name}</p>
          <p>Bio: Bio er ikke tilgjengelig"</p>
        </div>
      )}
    </>
  );
};
