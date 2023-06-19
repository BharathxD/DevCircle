"use client";

import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { FC, useCallback } from "react";

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter();
  return (
    <button
      className="h-full w-10 rounded-none rounded-tr-lg hover:rounded-none border-l-[1px] border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
      onClick={() => router.back()}
    >
      <AiOutlineClose aria-label="close modal" size={20} />
    </button>
  );
};

export default CloseModal;
