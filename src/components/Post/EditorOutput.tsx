import { FC } from "react";
import dynamic from "next/dynamic";
import CustomImageRenderer from "../Renderers/CustomImageRenderer";
import CustomCodeRenderer from "../Renderers/CustomCodeRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
  };
  const style = {
    paragraph: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
    },
    linkTool: {
      container: {
        backgroundColor: "red",
      },
    },
  };
  const config = {
    linkTool: {
      disableDefaultStyle: true,
    },
  };
  return (
    <Output
      style={style}
      className="text-sm"
      data={content}
      renderers={renderers}
      config={config}
    />
  );
};

export default EditorOutput;
