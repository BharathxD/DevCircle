import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

type Props<T> = (options: T) => void;

const useDebounce = <T>(cb: Props<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = cb;
  }, [cb]);

  const debouncedCb = useMemo(() => {
    const func = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCb;
};

export default useDebounce;
