import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

export default function modalClose(
  isDisplay: boolean,
  setIsDisplay: Dispatch<SetStateAction<boolean>>,
  outSide: RefObject<HTMLDivElement> | RefObject<HTMLButtonElement>,
) {
  const clickOutSide = (e: MouseEvent) => {
    if (
      isDisplay &&
      outSide.current &&
      !outSide.current?.contains(e.target as Node)
    ) {
      setIsDisplay(false);
    }
  };

  document.addEventListener("click", clickOutSide as any);
  return () => document.removeEventListener("click", clickOutSide as any);
}
