import {
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ReactElement } from "react";

export type IconButtonWithTooltipProps = Omit<IconButtonProps, "children"> & {
  icon: ReactElement;
  tooltipText: string;
  tooltipPlacement?: TooltipProps["placement"];
  tooltipProps?: Omit<IconButtonProps, "children" | "title" | "placement">;
  selected?: boolean;
};

export const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({
  icon,
  tooltipText,
  tooltipPlacement = "bottom",
  selected = false,
  ...restProps
}) => {
  return (
    <Tooltip
      aria-label={tooltipText}
      title={tooltipText}
      placement={tooltipPlacement}
    >
      <IconButton aria-label={tooltipText} {...restProps}>
        {React.cloneElement(icon, {
          sx: {
            color: selected ? "white" : grey[300],
          },
        })}
      </IconButton>
    </Tooltip>
  );
};
