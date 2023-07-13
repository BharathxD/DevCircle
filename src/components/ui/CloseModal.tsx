"use client";

import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

const CloseModal: React.FC = ({}) => {
  const router = useRouter();
  return (
    <button
      className="flex h-full w-10 items-center justify-center rounded-none rounded-tr-lg border-l-2 border-zinc-800 transition-colors hover:rounded-none hover:bg-zinc-800 hover:text-zinc-300"
      onClick={() => router.back()}
    >
      <AiOutlineClose aria-label="close modal" size={20} />
    </button>
  );
};

export default CloseModal;
