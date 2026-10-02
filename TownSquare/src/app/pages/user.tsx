import React from "react";

type UserProps = {
  userId: string;
};

// This is a placeholder for the User page. You can replace this with your actual User page content.
export const User = ({ userId }: UserProps) => {
  return (
    <>
      <h1>UserPage</h1>
      <p>User ID: {userId}</p>
    </>
  );
};
