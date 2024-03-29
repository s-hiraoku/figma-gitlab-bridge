import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  // $getSelection,
} from "lexical";
import { useEffect } from "react";

type Props = {
  text: string;
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
export default function InitializePlugin(props: Props) {
  const [editor] = useLexicalComposerContext();
  const { text } = props;

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
    editor.update(() => {
      // Get the RootNode from the EditorState
      const rootNode = $getRoot();
      // Get the selection from the EditorState
      // const selection = $getSelection();
      // Create a new ParagraphNode
      const paragraphNode = $createParagraphNode();
      // Create a new TextNode
      const textNode = $createTextNode(text);
      // Append the text node to the paragraph
      paragraphNode.append(textNode);
      // Finally, append the paragraph to the root
      rootNode.append(paragraphNode);

      rootNode.clear().append(paragraphNode);
      rootNode.selectEnd();
    });
    return () => {
      // Cleanup
      editor.update(() => {
        // Get the RootNode from the EditorState
        const rootNode = $getRoot();
        // Remove all children from the root
        if (rootNode) {
          while (rootNode.firstChild) {
            rootNode.removeChild(rootNode.firstChild);
          }
        }
      });
    };
  }, [editor, text]);

  return null;
}
