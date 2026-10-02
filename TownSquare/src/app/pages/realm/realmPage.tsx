type RealmPageProps = {
  realmId: string;
};

export const RealmPage = ({ realmId }: RealmPageProps) => {
  return (
    <>
      <h1>Realm</h1>
      <p>Realm ID: {realmId}</p>
    </>
  );
};
