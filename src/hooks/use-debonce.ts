import { useEffect, useRef } from "react";
import { debounce } from "lodash";

type Props = () => void;

const useDebounce = (cb: Props) => {
  const ref = useRef(cb);

  useEffect(() => {
    ref.current = cb;
  }, [cb]);

  const debouncedCb = () => {
    const func = () => ref.current();

    return debounce(func);
  };

  return debouncedCb;
};

export default useDebounce;
