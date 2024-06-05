import React from "react";
import { FaScroll } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

export function ExpandButton({
  onClick,
  onHideClick,
}: {
  onClick: () => void;
  onHideClick: () => void;
}) {
  return (
    <div tw="relative h-16 w-16">
      <button
        tw="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 hover:bg-gray-50"
        onClick={onClick}
      >
        <FaScroll tw="h-7 w-7" />
      </button>
      <button
        tw="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-inset ring-black/5 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        onClick={onHideClick}
      >
        <IoCloseOutline tw="h-4 w-4" />
      </button>
    </div>
  );
}
