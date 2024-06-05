import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

function KeyboardInput({ text }: { text: string }) {
  return (
    <kbd tw="rounded-md border border-black/40 p-0.5 px-1 text-[0.875em] leading-none">
      {text}
    </kbd>
  );
}
export function ShortcutHint() {
  return (
    <div tw="flex gap-2 rounded-full bg-white/60 p-3 px-4 text-sm shadow-lg">
      <IoInformationCircleOutline tw="h-5 w-5 opacity-50" />
      <span>
        To toggle visibility, press <KeyboardInput text="Alt" /> +{" "}
        <KeyboardInput text="D" />
      </span>
    </div>
  );
}
