import { SearchField } from "./SearchButton";
const iconSize = "h-8 w-8 sm:h-12 sm:w-12 short:h-8 short:w-8";
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
      className={`flex w-full flex-col items-stretch gap-2 px-2 py-2 sm:px-4 md:flex-row md:items-center md:justify-between md:gap-4 ${fog}`}
    >
      <ul className="m-0 flex flex-1 list-none justify-evenly gap-1 p-0">
        <li className="min-w-0 flex-1 md:max-w-44">
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1 rounded py-1 text-xs text-white hover:bg-blue-400/50 font-['MinecraftiaRegular'] sm:flex-row sm:gap-2 sm:py-2 sm:text-base"
          >
            <img
              src="/assets/icons/svg/HomeIcon.svg"
              alt=""
              className={`${iconSize} object-contain`}
            />
            Home
          </a>
        </li>
        <li className="min-w-0 flex-1 md:max-w-44">
          <a
            href="/realms"
            className="flex flex-col items-center justify-center gap-1 rounded py-1 text-xs text-white hover:bg-blue-400/50 font-['MinecraftiaRegular'] sm:flex-row sm:gap-2 sm:py-2 sm:text-base"
          >
            <img
              src="/assets/icons/svg/CompassIcon.svg"
              alt=""
              className={`${iconSize} object-contain`}
            />
            Explore
          </a>
        </li>
        <li className="min-w-0 flex-1 md:max-w-44">
          <a
            href="/leaderboard"
            className="flex flex-col items-center justify-center gap-1 rounded py-1 text-xs text-white hover:bg-blue-400/50 font-['MinecraftiaRegular'] sm:flex-row sm:gap-2 sm:py-2 sm:text-base"
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
