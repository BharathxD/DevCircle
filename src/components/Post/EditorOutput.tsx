"use client";

import type { FC } from "react";
import dynamic from "next/dynamic";

import CustomCodeRenderer from "../Renderers/CustomCodeRenderer";
import CustomImageRenderer from "../Renderers/CustomImageRenderer";
import CustomTableRenderer from "../Renderers/CustomTableRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
  sm?: boolean;
}

const EditorOutput: FC<EditorOutputProps> = ({ content, sm }) => {
  const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
    table: CustomTableRenderer,
  };
  const style = {
    paragraph: {
      fontSize: sm ? "0.875rem" : "1rem",
      lineHeight: sm ? "1.25rem" : "1.5rem",
    },
    header: {
      h1: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        lineHeight: 1.2,
        letterSpacing: "0.05em",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: "bold",
        lineHeight: 1.3,
        letterSpacing: "0.03em",
      },
      h3: {
        fontSize: "1.8rem",
        fontWeight: "bold",
        lineHeight: 1.4,
        letterSpacing: "0.02em",
      },
      h4: {
        fontSize: "1.6rem",
        fontWeight: "bold",
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      },
      h5: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        lineHeight: 1.6,
        letterSpacing: "0.01em",
      },
      h6: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        lineHeight: 1.7,
        letterSpacing: "0.01em",
      },
    },
  };
  const config = {
    header: {
      disableDefaultStyle: true,
    },
    linkTool: {
      disableDefaultStyle: true,
    },
  };
  return (
    <Output
      key={"any"}
      style={sm ? undefined : style}
      data={content}
      renderers={renderers}
      config={config}
    />
  );
};

export default EditorOutput;
