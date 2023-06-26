"use client";

import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="h-[91vh] hidden dark:flex justify-center items-center">
        <MoonLoader size={50} color="white" />
      </div>
      <div className="h-[91vh] flex dark:hidden justify-center items-center">
        <MoonLoader size={50} color="black" />
      </div>
    </>
  );
};

export default Loader;
