type FilledInputType = {
  text: string;
  password: string;
};

export const FIllED_INPUT_TYPE = {
  text: "text",
  password: "password",
} as const satisfies FilledInputType;
