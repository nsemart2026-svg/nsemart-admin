"use client";
import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const set = (newValue: boolean) => setValue(newValue);

  return [value, toggle, set] as const;
};
