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
    <ul className="min-h-0 flex-1 overflow-y-auto">
      {communities.map((community, index) => (
        <MyRealmsCard key={community} index={index} communityName={community} />
      ))}
    </ul>
  );
};
