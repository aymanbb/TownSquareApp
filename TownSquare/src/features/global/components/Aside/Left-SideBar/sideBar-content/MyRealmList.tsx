import React from "react";
import { MyRealmsCard } from "./MyRealmsCard";

const communities = [
  "realm/funny",
  "realm/AskReddit",
  "realm/gaming",
  "realm/aww",
  "realm/Music",
  "realm/worldnews",
  "realm/todayilearned",
  "realm/movies",
  "realm/memes",
  "realm/science",
  "realm/pics",
  "realm/technology",
  "realm/fitness",
  "realm/programming",
  "realm/space",
];
export const MyRealmList = () => {
  return (
    <ul
      className="
      shadow-[inset_0_0_12px_4px_rgba(0,0,0,0.85)]
    relative w-full overflow-hidden
    bg-[url('/assets/textures/png/footer-stone.png')]
    bg-repeat bg-[length:150px_150px]"
    >
      {communities.map((community, index) => (
        <MyRealmsCard key={community} index={index} communityName={community} />
      ))}
    </ul>
  );
};
