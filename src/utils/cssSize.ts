export type CssSize = {
  value: number;
  unit: string;
};

export const extractValueAndUnitFromCssSizeString = (
  cssSize: string
): CssSize => {
  const match = cssSize.match(/(\d+(?:\.\d+)?)([a-zA-Z%]*)/);

  if (match) {
    return {
      value: Number(match[1]),
      unit: match[2] || "px",
    };
  } else {
    return { value: 0, unit: "px" };
  }
};

export const parseCssSizeString = (size: string) => {
  const match = size.match(/^(\d*\.?\d+)([a-z%]*)$/i);

  if (match) {
    const value = parseFloat(match[1]);
    const unit = match[2];

    return { value, unit };
  }

  return { value: 0, unit: "px" };
};

export const formatCssSizeString = (value: number, unit: string): string => {
  return `${value}${unit}`;
};
