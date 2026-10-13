import React from "react";

type MyRealmsCardProps = {
  communityName: string;
  index: number;
};

export const MyRealmsCard = ({ communityName, index }: MyRealmsCardProps) => {
  console.log(communityName);
  return (
    <li key={communityName + index}>
      <text className="font-['Almendra'] text-base text-yellow-400 hover:text-white">
        {" "}
        {communityName ?? ""}
      </text>
    </li>
  );
};
