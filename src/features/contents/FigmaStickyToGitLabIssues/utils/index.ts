export const parseFigmaId = (figmaURL: string) => {
  const match =
    /https:\/\/([\w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/.exec(
      figmaURL
    );

  if (match != null) {
    return match[3];
  }

  return null;
};
