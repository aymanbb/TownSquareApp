import { SearchField } from "./SearchButton";
const iconSize = "h-12 w-12";
const fog = `relative isolate z-50
  before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded
  relative isolate
  before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded
  before:bg-gradient-to-b before:from-slate-900/10 before:via-slate-800/35 before:to-slate-900/70
  before:backdrop-blur-[3px] before:content-['']
  before:transition-opacity before:duration-300
  hover:before:opacity-0
`;

export const NavBar = () => {
  return (
    <nav
      id="site-nav"
      className={`flex w-full items-center justify-between gap-4 px-4 py-2 ${fog}`}
    >
      <ul className="m-0 flex flex-1 list-none justify-evenly p-0">
        <li className="w-44">
          <a
            href="/"
            className="flex items-center justify-center gap-2 rounded py-2 text-white hover:bg-blue-400/50 font-['MinecraftiaRegular']"
          >
            <img
              src="/assets/icons/svg/HomeIcon.svg"
              alt=""
              className={`${iconSize} object-contain`}
            />
            Home
          </a>
        </li>
        <li className="w-44">
          <a
            href="/realms"
            className="flex items-center justify-center gap-2 rounded py-2 text-white hover:bg-blue-400/50 font-['MinecraftiaRegular']"
          >
            <img
              src="/assets/icons/svg/CompassIcon.svg"
              alt=""
              className={`${iconSize} object-contain`}
            />
            Explore
          </a>
        </li>
        <li className="w-44">
          <a
            href="/leaderboard"
            className="flex items-center justify-center gap-2 rounded py-2 text-white hover:bg-blue-400/50 font-['MinecraftiaRegular']"
          >
            <img
              src="/assets/icons/svg/TrophyIcon.svg"
              alt=""
              className={`${iconSize} object-contain`}
            />
            Leaderboard
          </a>
        </li>
      </ul>
      <SearchField />
    </nav>
  );
};
