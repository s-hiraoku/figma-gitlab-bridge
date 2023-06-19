import {
  parseCssSizeString,
  extractValueAndUnitFromCssSizeString,
  formatCssSizeString,
} from "./cssSize";

describe("extractValueAndUnitFromCssSizeString", () => {
  it("should correctly extract pixel values", () => {
    const result = extractValueAndUnitFromCssSizeString("10px");
    expect(result).toEqual({ value: 10, unit: "px" });
  });

  it("should correctly extract percentage values", () => {
    const result = extractValueAndUnitFromCssSizeString("50%");
    expect(result).toEqual({ value: 50, unit: "%" });
  });

  it("should correctly extract values with no unit and default to px", () => {
    const result = extractValueAndUnitFromCssSizeString("20");
    expect(result).toEqual({ value: 20, unit: "px" });
  });

  it("should correctly extract decimal values", () => {
    const result = extractValueAndUnitFromCssSizeString("15.5em");
    expect(result).toEqual({ value: 15.5, unit: "em" });
  });

  it('should return { value: 0, unit: "px" } for invalid inputs', () => {
    const result = extractValueAndUnitFromCssSizeString("invalid");
    expect(result).toEqual({ value: 0, unit: "px" });
  });
});

describe("parseCssSizeString", () => {
  it("should correctly parse pixel values", () => {
    const result = parseCssSizeString("10px");
    expect(result).toEqual({ value: 10, unit: "px" });
  });

  it("should correctly parse percentage values", () => {
    const result = parseCssSizeString("50%");
    expect(result).toEqual({ value: 50, unit: "%" });
  });

  it("should correctly parse values with no unit", () => {
    const result = parseCssSizeString("20");
    expect(result).toEqual({ value: 20, unit: "" });
  });

  it("should correctly parse decimal values", () => {
    const result = parseCssSizeString("15.5em");
    expect(result).toEqual({ value: 15.5, unit: "em" });
  });

  it('should return { value: 0, unit: "px" } for invalid inputs', () => {
    const result = parseCssSizeString("invalid");
    expect(result).toEqual({ value: 0, unit: "px" });
  });
});

describe("formatCssSizeString", () => {
  it("should return a properly formatted CSS size string", () => {
    expect(formatCssSizeString(10, "px")).toBe("10px");
    expect(formatCssSizeString(5.5, "em")).toBe("5.5em");
    expect(formatCssSizeString(0, "%")).toBe("0%");
  });

  it("should handle cases where the unit is an empty string", () => {
    expect(formatCssSizeString(10, "")).toBe("10");
    expect(formatCssSizeString(0, "")).toBe("0");
  });
});
