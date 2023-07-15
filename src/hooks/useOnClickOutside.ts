"use client";

import { useEffect } from "react";

type Event = MouseEvent | TouchEvent;

/**
 * This is a TypeScript function that listens for clicks outside of a specified element and triggers a
 * handler function.
 * @param ref - RefObject<T> is a generic type that represents a reference to a DOM element. It can be
 * used to access and manipulate the properties and methods of the referenced element.
 * @param handler - The `handler` parameter is a callback function that will be called when a click or touch
 * event occurs outside of the element passed as `ref`. The `event` object will be passed as an
 * argument to this function.
 */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) return;
      // Call the handler only if the click is outside of the element passed.
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    // Reload only if ref or handler changes
  }, [ref, handler]);
};

export default useOnClickOutside;
