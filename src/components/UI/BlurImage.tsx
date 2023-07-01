"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import cn from "clsx";

const BlurImage = (props: ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "brightness-90 transition will-change-auto duration-700 ease-in-out group-hover:brightness-110",
        isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export { BlurImage };
