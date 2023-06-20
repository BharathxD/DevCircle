import Image from "next/image";
import { FC } from "react";

interface CustomImageRendererProps {
  data: {
    file: {
      url: string;
    };
  };
}

const CustomImageRenderer: FC<CustomImageRendererProps> = ({ data }) => {
  const src = data.file.url;
  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" src={src} fill />
    </div>
  );
};

export default CustomImageRenderer;
