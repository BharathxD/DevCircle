"use client";

import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[91vh] flex justify-center items-center">
      <div className="border-1 border-zinc-800 rounded-full p-1 bg-zinc-50 dark:bg-zinc-700">
        <MoonLoader size={50} color="black" />
      </div>
    </div>
  );
};

export default Loader;
