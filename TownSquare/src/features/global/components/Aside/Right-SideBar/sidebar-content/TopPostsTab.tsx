import React from "react";

export const TopPostsTab = () => {
  return (
    <div>
      <section className="flex list-none gap-3 p-0">
        <img
          src="/assets/icons/svg/FlameIcon.svg"
          alt="Profile picture"
          aria-hidden="true"
          className="h-7 w-7 object-contain
        "
        />
        <h3> Trending this week</h3>
      </section>

      <ol>
        <li> Post 1 </li>
        <li> Post 2 </li>
        <li> Post 3 </li>
        <li> Post 4 </li>
        <li> Post 5 </li>
      </ol>
    </div>
  );
};
