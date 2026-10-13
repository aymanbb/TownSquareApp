export const NavBar = () => {
  return (
    <nav id="site-nav" className="flex w-full items-center justify-between gap-4">
      <ul className="flex flex-1 p-0 m-0 list-none">
        <li className="flex-1 text-center">
          <a href="/" className="text-black block py-2">Home</a>
        </li>
        <li className="flex-1 text-center">
          <a href="/realms" className="text-black block py-2">Explore</a>
        </li>
        <li className="flex-1 text-center">
          <a href="/leaderboard" className="text-black block py-2">Leaderboard</a>
        </li>
      </ul>
      <form id="search-bar" className="flex items-center gap-2">
        <label htmlFor="search" className="text-black">Søk: </label>
        <input 
          type="search" 
          id="search" 
          className="border border-gray-300 rounded px-2 py-1" 
        />
        <button 
          type="submit" 
          className="px-3 py-1 bg-black text-white rounded">
            Search
          </button>
      </form>
    </nav>
  );
};
