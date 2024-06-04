import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

function KeyboardInput({ text }: { text: string }) {
  return (
    <kbd className="dt-rounded-md dt-border dt-border-black/40 dt-p-0.5 dt-px-1 dt-text-[0.875em] dt-leading-none">
      {text}
    </kbd>
  );
}
export function ShortcutHint() {
  return (
    <div className="dt-flex dt-gap-2 dt-rounded-full dt-bg-white/60 dt-p-3 dt-px-4 dt-text-sm dt-shadow-lg">
      <IoInformationCircleOutline className="dt-h-5 dt-w-5 dt-opacity-50" />
      <span>
        To toggle visibility, press <KeyboardInput text="Alt" /> +{" "}
        <KeyboardInput text="D" />
      </span>
    </div>
  );
}
