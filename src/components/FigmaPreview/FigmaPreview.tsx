import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { PacmanLoader } from "react-spinners";

type FigmaPreviewProps = {
  url: string;
  title?: string;
  onLoaded?: () => void;
};

export const FigmaPreview: React.FC<FigmaPreviewProps> = ({
  url,
  title = "Figma Preview",
  onLoaded,
}) => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  return (
    <>
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <PacmanLoader color={theme.palette.primary.main} />
        </div>
      )}
      <iframe
        title={title}
        className="w-full h-full"
        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
          url
        )}`}
        onLoad={() => {
          setLoading(false);
          if (onLoaded) {
            onLoaded();
          }
        }}
        allowFullScreen
      />
    </>
  );
};
