import { $getRoot, EditorState } from "lexical";
import { LexicalEditor } from "./LexicalEditor";
import { useCallback } from "react";

type LexicalEditorWrapperProps = {
  initialText: string;
  onChange?: (text: string) => void;
  onBlur?: (text: string) => void;
};

export const LexicalEditorWrapper: React.FC<LexicalEditorWrapperProps> = ({
  initialText,
  onChange,
  onBlur,
}) => {
  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      onChange?.(editorState.read(() => $getRoot().getTextContent()));
    },
    [onChange]
  );

  const handleEditorBlur = useCallback(
    (editorState: EditorState) => {
      onBlur?.(editorState.read(() => $getRoot().getTextContent()));
    },
    [onBlur]
  );

  return (
    <LexicalEditor
      initialText={initialText}
      onChange={handleEditorChange}
      onBlur={handleEditorBlur}
    />
  );
};
