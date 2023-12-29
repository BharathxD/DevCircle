"use client";

import { useEffect, useState } from "react";

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  return isMounted;
};

export default useIsMounted;
