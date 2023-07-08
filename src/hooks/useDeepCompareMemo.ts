import { deepEqual } from "@utils/deepEqual";
import { useRef } from "react";

export const useDeepCompareMemo = <T>(value: T) => {
  const ref = useRef<T | undefined>();

  if (!deepEqual<T | undefined>(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};
