"use client";
import { useEffect, RefObject } from "react";

type ClickOutsideHandler = () => void;

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClose: ClickOutsideHandler
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useClickOutside;
