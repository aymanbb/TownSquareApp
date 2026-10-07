import React from "react";
<<<<<<< HEAD
import { NavBar } from "./NavBar";
export const Header = () => {
  return (
    <header>
      {
        //<Logo />
      }
      <NavBar />
    </header>
  );
};
=======

export function Header() {
    return (
        <nav id="site-nav">
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/explore">Explore</a></li>
                <li><a href="/leaderboard">Leaderboard</a></li>
            </ul>
            <form id="search-bar">
                <label htmlFor="search">Søk: </label>
                <input type="search" id="search" />
                <button type="submit"></button>
            </form>
        </nav>
    )
}
>>>>>>> d46c196091571862ccee17cf40b9c36e97b77b4c
