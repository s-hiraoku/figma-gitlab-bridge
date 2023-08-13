export const maskToken = (
  token: string,
  prefixLength = 5,
  suffixLength = -5
) => {
  const prefix = token.slice(0, prefixLength);
  const suffix = token.slice(suffixLength);
  const maskedPart = "*".repeat(token.length - (prefix.length + suffix.length));
  return `${prefix}${maskedPart}${suffix}`;
};
