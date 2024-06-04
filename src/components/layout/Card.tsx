import clsx from "clsx";
import React from "react";

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
      className={clsx(
        "dt-divide-y dt-divide-slate-100 dt-overflow-hidden dt-rounded-lg dt-shadow",
        onClick && "dt-cursor-pointer",
        locked ? "dt-bg-white/50" : "dt-bg-white",
        inactive && "dt-opacity-50",
        showRing && "dt-bg-indigo-50 dt-ring-2 dt-ring-indigo-500",
      )}
      onClick={onClick}
    >
      <div className="dt-px-2 dt-py-3 sm:dt-px-3">{headerContent}</div>
      {children && <div className="dt-px-2 dt-py-3 sm:dt-p-3">{children}</div>}
    </div>
  );
}
