import type { User } from "@/features/auth/types/User";

type UserProp = {
  user: Partial<User>;
  rankedSpot: number;
};

const formatDate = (value: unknown) =>
  value ? new Date(value as string | Date).toLocaleDateString() : "Unknown";

// Minecraft-knapp: grå flate, lys kant oppe/venstre, mørk kant nede/høyre, svart ramme rundt
const buttonStyle =
  "flex w-full items-center gap-5 px-5 py-3 " +
  "bg-[#6F6F6F] border-2 border-black rounded-none " +
  "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
  "font-['Pixelify_Sans'] text-white [text-shadow:2px_2px_0_#3F3F3F] " +
  "[image-rendering:pixelated] select-none " +
  "hover:bg-[#7E88BF] hover:shadow-[inset_2px_2px_0_#BEC6F0,inset_-2px_-2px_0_#4E5788]";

// Inventory-slot: mørk kant oppe/venstre, lys kant nede/høyre
const slotStyle =
  "h-14 w-14 shrink-0 bg-[#8B8B8B] p-1 " +
  "shadow-[inset_2px_2px_0_#373737,inset_-2px_-2px_0_#FFFFFF]";

export const UserCard = ({ user, rankedSpot }: UserProp) => {
  const name = user.name ?? "unknown";

  return (
    <div className={buttonStyle}>
      <div className="w-12 text-center text-2xl text-[#FFFF55] [text-shadow:2px_2px_0_#3F3F15]">
        #{rankedSpot}
      </div>

      <div className={slotStyle}>
        <img
          src="/assets/icons/svg/UserIcon.svg"
          alt={`${name}'s avatar`}
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="m-0 truncate text-lg">{user.displayName ?? name}</h2>
        <p className="my-1 text-[#E0E0E0]">@{name}</p>
        {user.bio && <p className="my-2 text-sm text-[#E0E0E0]">{user.bio}</p>}
        <p className="m-0 text-xs text-[#D0D0D0]">
          Joined: {formatDate(user.createdAt)}
        </p>
      </div>

      <div className="flex min-w-16 flex-col items-center">
        <span className="text-[10px] tracking-widest text-[#E0E0E0]">
          LEVEL
        </span>
        <strong className="text-2xl font-normal text-[#80FF20] [text-shadow:2px_2px_0_#203F08]">
          {user.level ?? 0}
        </strong>
      </div>
    </div>
  );
};
