"use client";
import React from "react";
import { useState, useEffect } from "react";
import Buffering from "@/features/global/components/Buffering";
import { User } from "@/features/auth/types/User";
import { Realm } from "@/features/realms/types/Realm";
import { listUsers } from "@/features/auth/api/user-api";
import { listRealms } from "@/features/realms/api/realms-api";
import { Result } from "@/features/utils/Result";
import { useFetch } from "@/features/utils/useFetch";

type SearchResult =
  | { type: "user"; data: Partial<User> }
  | { type: "realm"; data: Partial<Realm> };

export const SearchField = () => {
  console.log("SearchField component rendered");
  const [search, setSearch] = useState("");
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetch(listUsers, []);
  const {
    data: realms,
    loading: realmsLoading,
    error: realmsError,
  } = useFetch(listRealms, []);

  const [filteredResult, setFilteredResult] = useState<SearchResult[]>([]);

  const [open, setOpen] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Searching for:", search);
  };

  useEffect(() => {
    // Filter users based on the search query
    // Henter ut brukere og realms som matcher søkestrengen
    // Bruker filter for å sjekke om navnet inneholder søkestrengen (case-insensitive)
    setFilteredResult([
      ...realms
        .filter((realm) =>
          realm.name?.toLowerCase().includes(search.toLowerCase()),
        )
        .map((realm) => ({ type: "realm" as const, data: realm })),
      ...users
        .filter((user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()),
        )
        .map((user) => ({ type: "user" as const, data: user })),
    ]);
  }, [search, users, realms]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    //console.log("Input changed to:", event.target.value);
  };

  if (usersLoading || realmsLoading) return <Buffering />;
  if (usersError) return <p>{usersError}</p>;
  if (realmsError) return <p>{realmsError}</p>;

  return (
    <form
      id="search-bar"
      className="flex items-center gap-2"
      onSubmit={handleSearch}
    >
      <label htmlFor="search" className="text-white">
        <img
          src="/assets/icons/svg/MagnifyingGlassSilver.svg"
          alt=""
          className={`h-14 w-14 object-contain`}
        />
      </label>
      <div className="relative">
        <input
          type="search"
          id="search"
          name="search"
          autoComplete="off"
          className="rounded border border-gray-300 px-2 py-1 text-white bg-gray-700"
          placeholder="Seek the Realms..."
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          value={search}
        />
        {open && search.trim() && (
          <ul
            className="absolute left-0 top-full z-50 mt-1 max-h-72 w-64 overflow-y-auto
        border-2 border-black bg-gray-700
        shadow-[inset_2px_2px_0_#5A5A5A,inset_-2px_-2px_0_#1A1A1A,0_4px_0_#000]"
          >
            {filteredResult.map((result) => (
              <li
                className="text-gray-400 hover:bg-blue-400/50"
                key={result.data.id}
              >
                <a
                  href={
                    result.type === "user"
                      ? `/user/${result.data.name}`
                      : `/realms/${result.data.id}`
                  }
                  className="block w-full px-2 py-1"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {result.type}/{result.data.name}
                </a>
              </li>
            ))}
            {filteredResult.length === 0 && (
              <li className="px-2 py-1 text-gray-400">No results found</li>
            )}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="rounded px-3 py-1 text-white
    bg-gray-500 bg-cover [image-rendering:pixelated]
    font-['MinecraftiaRegular']
    border-2 border-t-[#AAA] border-l-[#AAA] border-r-[#565656] border-b-[#565656]
    text-shadow-[3px_3px_#4C4C4C]
    outline-2 outline-solid outline-black
    px-4 py-2 text-white
    hover:bg-blue-400/50
  "
      >
        Search
      </button>
    </form>
  );
};
