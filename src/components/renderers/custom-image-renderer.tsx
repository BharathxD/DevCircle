"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ImCancelCircle } from "react-icons/im";

import { BlurImage } from "../ui/blur-image";
import { Button } from "../ui/button";

function CustomImageRenderer({ data }: { data: { file: { url: string } } }) {
  const isHomepage = usePathname() === "/";
  const [open, setOpen] = useState<boolean>(false);
  const src = data.file.url;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = "image.jpg";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="relative flex h-fit w-full items-center justify-center p-4">
        <BlurImage
          alt="image"
          className="aspect-video size-full cursor-pointer rounded-lg border-2 border-zinc-700 bg-zinc-50 object-contain dark:border dark:bg-zinc-950/20"
          height={800}
          width={800}
          src={src}
          onClick={() => setOpen((prev) => !isHomepage ?? !prev)}
        />
      </div>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-10 h-full cursor-default overflow-hidden bg-zinc-50 backdrop-blur-md dark:bg-zinc-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>
            <BlurImage
              alt="image"
              className="object-contain p-0 md:p-5"
              fill
              src={src}
            />
          </div>
          <div className="absolute bottom-10 z-10 flex h-fit w-full items-center justify-center">
            <div className="flex items-center gap-2 rounded-lg border-2 border-zinc-700 bg-zinc-900 p-2">
              <Button onClick={handleDownload}>Download</Button>
              <Button
                onClick={() => setOpen((prev) => !prev)}
                variant="destructive"
                className="bg-red-500"
                size="sm"
              >
                <ImCancelCircle />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default CustomImageRenderer;
