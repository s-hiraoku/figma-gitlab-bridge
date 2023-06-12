import { LexicalEditor } from "./LexicalEditor";

type LexicalEditorWrapperProps = {
  initialText: string;
  onChange: (text: string) => void;
};

export const LexicalEditorWrapper: React.FC<LexicalEditorWrapperProps> = ({
  initialText,
  onChange,
}) => {
  return <LexicalEditor initialText={initialText} />;
};
