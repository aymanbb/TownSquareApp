import React from "react";
import styles from "../app/styles.css"

export function Header() {
    return (
        <header id="site-header" className="grid grid-rows-1 grid-cols-2 max-w-8/10 fixed top-20 right-4/10">
            <nav id="site-nav" className="bg-amber-500 space-around pr-3">
                <ul className="flex gap-4">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/explore">Explore</a></li>
                    <li><a href="/leaderboard">Leaderboard</a></li>
                </ul>
            </nav>
            <form id="search-bar" className="bg-emerald-700">
                <label htmlFor="search" className="pr-1 ml-2">Søk: </label>
                <input type="search" id="search" className="border-black border-s-3" />
                <button type="submit"></button>
            </form>
        </header>
    )
}