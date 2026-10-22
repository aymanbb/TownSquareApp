"use client";
import React, { useEffect, useState } from "react";
import { authClient } from "@/auth/auth-client";
export const AccountTab = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="w-full">
      <section className="flex list-none center justify-left gap-1 p-0 w-auto">
        <img
          src="/assets/icons/svg/UserIcon.svg"
          alt="Profile picture"
          aria-hidden="true"
          className="h-12 w-12 object-contain
        "
        />
        {isPending ? (
          <p>Laster…</p>
        ) : user ? (
          <p>Welcome back, {user.name}!</p>
        ) : (
          <>
            <a href="/login">Login</a>
            <p>Or</p>
            <a href="/register">Register</a>
          </>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <a href="">View Profile</a>
        <a href="">Messages</a>
        <a href="">Settings</a>

        {user && <button onClick={handleLogout}>Logout</button>}
      </section>
    </div>
  );
};
