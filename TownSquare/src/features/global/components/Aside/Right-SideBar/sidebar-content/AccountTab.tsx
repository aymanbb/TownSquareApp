import React from "react";

export const AccountTab = () => {
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
        <a href="/login">Login</a>
        <p>Or</p>
        <a href="/register">Register</a>
      </section>

      <section className="flex flex-col gap-2">
        <a href="">View Profile</a>
        <a href="">Messages</a>
        <a href="">Settings</a>
        <a href="">Logout</a>
      </section>
    </div>
  );
};
