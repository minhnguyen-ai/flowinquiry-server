// Function to make Base64 encoding URL-safe
const toBase64UrlSafe = (base64: string): string => {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// Function to reverse URL-safe Base64 encoding back to regular Base64
const fromBase64UrlSafe = (base64UrlSafe: string): string => {
  let base64 = base64UrlSafe.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding back (if necessary)
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return base64;
};

// Function to obfuscate/encode the value (handles both string and number)
export const obfuscate = (value: string | number): string => {
  const base64 = Buffer.from(value.toString()).toString("base64");
  return toBase64UrlSafe(base64);
};

// Function to decode the value (returns the original type: string or number)
export const deobfuscate = (encodedValue: string): string | number => {
  const base64 = fromBase64UrlSafe(encodedValue);
  const decodedString = Buffer.from(base64, "base64").toString("utf-8");

  // Check if the decoded value is a number
  const parsedNumber = parseFloat(decodedString);
  return isNaN(parsedNumber) ? decodedString : parsedNumber;
};
