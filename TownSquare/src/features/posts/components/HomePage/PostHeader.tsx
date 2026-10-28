// Minecraft-knapp: grå flate, lys kant oppe/venstre, mørk kant nede/høyre
const mcButton =
  "border-2 border-black bg-[#6F6F6F] px-4 py-2 text-white " +
  "shadow-[inset_2px_2px_0_#AAAAAA,inset_-2px_-2px_0_#4A4A4A] " +
  "[text-shadow:2px_2px_0_#3F3F3F] font-['Pixelify_Sans'] [image-rendering:pixelated]";

// Klikkbar variant: blir blå ved hover og trykkes inn ved klikk, som i Minecraft-menyen
const mcButtonInteractive =
  mcButton +
  " cursor-pointer hover:bg-[#7E88BF] " +
  "hover:shadow-[inset_2px_2px_0_#BEC6F0,inset_-2px_-2px_0_#4E5788] " +
  "active:shadow-[inset_-2px_-2px_0_#AAAAAA,inset_2px_2px_0_#4A4A4A]";

export const PostFeedHeader = () => {
  return (
    <div className="flex items-center justify-between gap-3 bg-[url('/assets/textures/png/footer-stone.png')]  bg-repeat bg-[length:150px_150px] bg-opacity-50 p-4 rounded-lg outline-solid outline-black">
      <button type="button" className={`${mcButtonInteractive} text-sm`}>
        Sorted by Alphabetical
      </button>
      <button type="button" className={`${mcButtonInteractive} text-sm`}>
        Sorted by Recent
      </button>
    </div>
  );
};
export default PostFeedHeader;
