import { useState } from "react";

export default function useToggleItems(initialValue, initialPosition = 0) {
  if (!Array.isArray(initialValue) || initialValue.length === 0) {
    throw new Error("initialValue must be a non-empty array");
  }

  const startPos =
    initialPosition >= 0 && initialPosition < initialValue.length
      ? initialPosition
      : 0;

  const [index, setIndex] = useState(startPos);

  const toggleState = () => {
    setIndex((prevIndex) => (prevIndex + 1) % initialValue.length);
  };

  return [initialValue[index], toggleState];
}
