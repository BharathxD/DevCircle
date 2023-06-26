"use client"

import { MoonLoader } from "react-spinners"

const Loader = () => {
  return (
    <>
      <div className="hidden h-[91vh] items-center justify-center dark:flex">
        <MoonLoader size={50} color="white" />
      </div>
      <div className="flex h-[91vh] items-center justify-center dark:hidden">
        <MoonLoader size={50} color="black" />
      </div>
    </>
  )
}

export default Loader
