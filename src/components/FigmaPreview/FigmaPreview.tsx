import { Loading } from "@components/Loading";
import React, { useState } from "react";

type FigmaPreviewProps = {
  url: string;
  title?: string;
};

export const FigmaPreview: React.FC<FigmaPreviewProps> = ({
  url,
  title = "Figma Preview",
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <iframe
        title={title}
        className="w-full h-full"
        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
          url
        )}`}
        onLoad={() => setLoading(false)}
        allowFullScreen
      />
    </>
  );
};
