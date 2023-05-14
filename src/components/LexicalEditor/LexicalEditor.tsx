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
import { useTheme } from "@mui/material";
import { useState } from "react";

export function LexicalEditor() {
  const theme = useTheme();

  const [borderColor, setBorderColor] = useState(theme.palette.divider);
  const [isFocused, setIsFocused] = useState(false);

  const cursorColor = theme.palette.text.primary;

  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor(theme.palette.primary.main);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setBorderColor(theme.palette.divider);
  };

  const handleMouseEnter = () => {
    if (!isFocused) {
      setBorderColor(theme.palette.action.hover);
    }
  };

  const handleMouseLeave = () => {
    if (!isFocused) {
      setBorderColor(theme.palette.divider);
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className={styles.editorContainer}
        style={{
          backgroundColor: theme.palette.background.default,
          border: `2px solid ${borderColor}`,
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
              className={styles.editorInput}
              style={{ caretColor: cursorColor }}
            />
          }
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
