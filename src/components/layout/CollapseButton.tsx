import React from "react";
import { RiCollapseDiagonal2Fill } from "react-icons/ri";

export function CollapseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="dt-flex dt-h-11 dt-w-11 dt-items-center dt-justify-center dt-rounded-full dt-shadow-sm dt-ring-1 dt-ring-inset dt-ring-gray-300 hover:dt-bg-gray-50 disabled:dt-cursor-not-allowed disabled:dt-opacity-50 disabled:hover:dt-bg-white"
      onClick={onClick}
    >
      <RiCollapseDiagonal2Fill className="dt-h-5 dt-w-5" />
    </button>
  );
}
