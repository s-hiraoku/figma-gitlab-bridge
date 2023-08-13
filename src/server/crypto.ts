import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const KEY = crypto.randomBytes(32); // 256 bits
const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(text: string): string {
  const textParts = text.split(":");
  const shiftedPart = textParts.shift();

  if (!shiftedPart) {
    throw new Error("Decryption failed. Invalid text provided");
  }

  const iv = Buffer.from(shiftedPart, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]).toString("utf8");
  return decrypted;
}
