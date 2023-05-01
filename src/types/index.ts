import { IconButtonWithTooltipProps } from "@components/IconButtonWithTooltip";
import { IconButtonProps } from "@mui/material";

export type IconType = {
  id: string;
  icon:
    | React.ReactElement<IconButtonWithTooltipProps>
    | React.ReactElement<IconButtonProps>;
};
