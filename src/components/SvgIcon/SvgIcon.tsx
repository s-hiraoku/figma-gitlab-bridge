import React from "react";
import { Dimensions, Color } from "@types";
import styles from "./SvgIcon.module.css";

const DEFAULT_SIZE = "16px";

export type SvgIconProps = {
  iconUrl: string;
  dimensions?: Dimensions;
  color?: Color;
};

export const SvgIcon: React.FC<SvgIconProps> = ({
  iconUrl,
  dimensions,
  color,
}) => {
  const style = {
    maskImage: `url(${iconUrl})`,
    backgroundColor: color || "black",
    width: dimensions?.width || DEFAULT_SIZE,
    height: dimensions?.height || DEFAULT_SIZE,
  };
  return <span style={style} className={styles.icon} />;
};
