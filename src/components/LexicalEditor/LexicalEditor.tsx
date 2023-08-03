import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import editorConfig from "./editorConfig";
import styles from "./LexicalEditor.module.css";
import { useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import InitializePlugin from "./plugins/InitializePlugin";
import { EditorState } from "lexical";

type LexicalEditorProps = {
  initialText: string;
  onChange?: (editorState: EditorState) => void;
  onBlur?: (editorState: EditorState) => void;
};

export function LexicalEditor(props: LexicalEditorProps) {
  const theme = useTheme();
  const { initialText, onChange, onBlur } = props;

  const [borderColor, setBorderColor] = useState<string>(theme.palette.divider);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [currentEditorState, setCurrentEditorState] = useState<
    EditorState | undefined
  >(undefined);

  const cursorColor = theme.palette.text.primary;

  const handleEditorStateChange = useCallback(
    (editorState: EditorState) => {
      onChange?.(editorState);
      setCurrentEditorState(editorState);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setBorderColor(theme.palette.primary.main);
  }, [theme.palette.primary.main]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setBorderColor(theme.palette.divider);
    if (currentEditorState) {
      onBlur?.(currentEditorState);
    }
  }, [currentEditorState, onBlur, theme.palette.divider]);

  const handleMouseEnter = useCallback(() => {
    if (!isFocused) {
      setBorderColor(theme.palette.action.hover);
    }
  }, [isFocused, theme.palette.action.hover]);

  const handleMouseLeave = useCallback(() => {
    if (!isFocused) {
      setBorderColor(theme.palette.divider);
    }
  }, [isFocused, theme.palette.divider]);

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
        <OnChangePlugin onChange={handleEditorStateChange} />
        <HistoryPlugin />
        <InitializePlugin text={initialText} />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className={styles.editorPlaceholder}>Enter import data...</div>;
}
