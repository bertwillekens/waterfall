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
    <div className="dt-relative dt-h-16 dt-w-16">
      <button
        className="dt-flex dt-h-16 dt-w-16 dt-items-center dt-justify-center dt-rounded-full dt-bg-white dt-shadow-lg dt-ring-1 dt-ring-black/5 hover:dt-bg-gray-50"
        onClick={onClick}
      >
        <FaScroll className="dt-h-7 dt-w-7" />
      </button>
      <button
        className="dt-absolute -dt-right-1 -dt-top-1 dt-flex dt-h-6 dt-w-6 dt-items-center dt-justify-center dt-rounded-full dt-bg-white dt-shadow-md dt-ring-1 dt-ring-inset dt-ring-black/5 hover:dt-bg-gray-50 disabled:dt-cursor-not-allowed disabled:dt-opacity-50 disabled:hover:dt-bg-white"
        onClick={onHideClick}
      >
        <IoCloseOutline className="dt-h-4 dt-w-4" />
      </button>
    </div>
  );
}
