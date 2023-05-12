import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
import editorConfig from "./editorConfig";
import onChange from "./onChange";
import styles from "./LexicalEditor.module.css";

export function LexicalEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles.editorContainer}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={styles.editorInput} />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return (
    <div className={styles.editorPlaceholder}>Enter some plain text...</div>
  );
}
