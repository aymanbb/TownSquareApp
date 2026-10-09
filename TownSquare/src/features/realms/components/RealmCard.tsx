import { Realm } from "../types/Realm"

type RealmProps = {
    children: Realm;
}

export function RealmCard({ children }: RealmProps) {

    const { name, description, createdAt, membersCount } = children;

    return (
        <div>
            <h3>Realm name: {name} </h3>
            <p>Description: {description}</p>
            <p>Created at: {createdAt}</p>
            <p>Members: {membersCount}</p>
        </div>
    )
}