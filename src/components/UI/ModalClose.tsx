"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const ModalClose = () => {
  const router = useRouter();
  return (
    <button
      className=" absolute right-2 top-2 rounded-full border-2 border-zinc-600 bg-zinc-600 p-1"
      onClick={() => router.back()}
    >
      <X className="h-4 w-4 text-zinc-50" />
    </button>
  );
};

export default ModalClose;
