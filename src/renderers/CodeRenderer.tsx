"use client";

import { FC } from "react";

interface CustomImageRendererProps {
  data: {
    code: string;
  };
}

const CustomCodeRenderer: FC<CustomImageRendererProps> = ({ data }) => {
  data;
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
};

export default CustomCodeRenderer;
