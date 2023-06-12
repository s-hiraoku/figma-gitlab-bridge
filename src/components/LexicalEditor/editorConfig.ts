import { LexicalEditor } from "lexical/LexicalEditor";
import ExampleTheme from "./themes/ExampleTheme";
import { InitialConfigType } from "@lexical/react/LexicalComposer";

const editorConfig: InitialConfigType = {
  namespace: "lexical-editor",
  theme: ExampleTheme,
  onError: (error: Error, editor: LexicalEditor) => {
    console.error(error);
  },
};

export default editorConfig;
