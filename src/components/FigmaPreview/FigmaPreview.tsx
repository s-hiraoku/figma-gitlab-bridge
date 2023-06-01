import React from "react";

type FigmaPreviewProps = {
  url: string;
  title?: string;
};

export const FigmaPreview: React.FC<FigmaPreviewProps> = ({
  url,
  title = "Figma Preview",
}) => {
  return (
    <iframe
      title={title}
      className="w-full h-full"
      src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
        url
      )}`}
      allowFullScreen
    />
  );
};
