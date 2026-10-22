import { Welcome } from "./welcome.js";
import Buffering from "@/features/global/components/Buffering";

export const Home = () => {
  // _Feel free to delete this element and its import_
  return (
    <>
      <Buffering />
      <Welcome />
    </>
  );
};
