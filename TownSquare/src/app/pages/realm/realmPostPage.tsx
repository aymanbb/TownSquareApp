import React from "react";

type realmPostPageProps = {
  realmId: string;
  postId: string;
};

export const RealmPostPage = ({ realmId, postId }: realmPostPageProps) => {
  // not implemented :(
  // was supposed to be for endpoint /realms/[realmId]/post/[postId]
  return (
    <>
      <h1>Realm Post Page</h1>
      <p>Realm ID: {realmId}</p>
      <p>Post ID: {postId}</p>
    </>
  );
};
