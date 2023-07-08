export const deepEqual = <T>(x: T, y: T): boolean => {
  if (x === y) {
    return true;
  }

  if (
    typeof x === "object" &&
    x !== null &&
    typeof y === "object" &&
    y !== null
  ) {
    const xAsObject = x as unknown as Record<string, unknown>;
    const yAsObject = y as unknown as Record<string, unknown>;

    if (Object.keys(xAsObject).length !== Object.keys(yAsObject).length) {
      return false;
    }

    for (const prop in xAsObject) {
      if (
        Object.prototype.hasOwnProperty.call(xAsObject, prop) &&
        !deepEqual(xAsObject[prop], yAsObject[prop])
      ) {
        return false;
      }
    }

    return true;
  }

  return false;
};
