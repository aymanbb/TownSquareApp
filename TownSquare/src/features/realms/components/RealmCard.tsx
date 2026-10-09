import { Realm } from "../types/Realm";

type RealmProps = {
    children: Realm;
}

export function RealmCard({ children }: RealmProps) {

    const { name, description, createdAt } = children;

    return (
        <article className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/80">
            
            <span className="absolute inset-y-0 left-0 w-1 bg-indigo-500" />
            
            <div className="px-5 py-4 pl-6">
                <header className="flex-col items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Realm name: {name} </h3>
                    <p>Description: {description}</p>
                    <p>Created at: {createdAt}</p>
                </header>
            </div>
        </article>
    )
}