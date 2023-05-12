import { LexicalEditor } from "lexical/LexicalEditor";
import ExampleTheme from "./themes/ExampleTheme";

const editorConfig = {
  namespace: "lexical-editor",
  theme: ExampleTheme,
  onError: (error: Error, editor: LexicalEditor) => {
    console.error(error);
  },
};

export default editorConfig;
