import React from "react";
import { RiCollapseDiagonal2Fill } from "react-icons/ri";

export function CollapseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      tw="flex h-11 w-11 items-center justify-center rounded-full shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      onClick={onClick}
    >
      <RiCollapseDiagonal2Fill tw="h-5 w-5" />
    </button>
  );
}
