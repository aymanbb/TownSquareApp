import React from "react";

export function Header() {
    return (
        <header id="site-header">
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
        </header>
    )
}