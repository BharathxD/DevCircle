"use client";

import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[82vh] flex justify-center items-center">
      <MoonLoader size={50} color="white" />
    </div>
  );
};

export default Loader;
