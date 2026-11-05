import React from "react";

type realmPostPageProps = {
  realmId: string;
  postId: string;
};

export const RealmPostPage = ({ realmId, postId }: realmPostPageProps) => {
  return (
    <>
      <h1>Realm Post Page</h1>
      <p>Realm ID: {realmId}</p>
      <p>Post ID: {postId}</p>
    </>
  );
};
