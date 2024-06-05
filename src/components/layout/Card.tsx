import React from "react";
import tw from "twin.macro";

//Controller component that
export function Card({
  headerContent,
  children,
  onClick,
  locked,
  inactive,
  showRing,
}: {
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  locked?: boolean;
  inactive?: boolean;
  showRing?: boolean;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      css={[
        tw`divide-y divide-slate-100 overflow-hidden rounded-lg shadow`,
        onClick && tw`cursor-pointer`,
        locked ? tw`bg-white/50` : tw`bg-white`,
        inactive && tw`opacity-50`,
        showRing && tw`bg-indigo-50 ring-2 ring-indigo-500`,
      ]}
      onClick={onClick}
    >
      <div tw="px-2 py-3 sm:px-3">{headerContent}</div>
      {children && <div tw="px-2 py-3 sm:p-3">{children}</div>}
    </div>
  );
}
