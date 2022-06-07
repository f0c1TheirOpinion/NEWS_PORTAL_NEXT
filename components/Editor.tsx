import React, { useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";

interface EditorProps {
  getBlock: (blocks: OutputData["blocks"]) => void;
  initialBlocks?: OutputData["blocks"];
}

export const Editor: React.FC<EditorProps> = ({ getBlock, initialBlocks }) => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editor",
      data: {
        blocks: initialBlocks,
      },

      placeholder: "Введите текст вашей статьи",
      async onChange() {
        const { blocks } = await editor.save();
        getBlock(blocks);
      },
    });
    const elemCount = document.getElementById("editor");

    return () => {
      editor.isReady
        .then(() => {
          if (elemCount.childElementCount >= 2) {
            document.querySelector("#editor").children[1].remove();
          }
        })
        .catch((e) => console.error("ERROR EDITOR", e));
    };
  }, []);

  return <div id="editor" />;
};
