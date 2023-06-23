"use client";

import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[91vh] flex justify-center items-center">
      <div className="border-2 border-zinc-800 rounded-full p-2 bg-zinc-50 dark:bg-zinc-800">
        <MoonLoader size={50} color="white" />
      </div>
    </div>
  );
};

export default Loader;
