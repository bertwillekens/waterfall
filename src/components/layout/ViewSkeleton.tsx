import React, { type PropsWithChildren } from "react";
import Button from "./Button";
import { IoChevronBackOutline } from "react-icons/io5";
import { CollapseButton } from "./CollapseButton";
import { useAppVisibility } from "../VisibilityContext";

export interface ViewSkeletonProps extends PropsWithChildren {
  title?: React.ReactNode;
  superTitle?: React.ReactNode;
  onBack?: () => void;
  forehead?: React.ReactNode;
  chin?: React.ReactNode;
}

export default function ViewSkeleton({
  title,
  superTitle,
  onBack,
  forehead,
  chin,
  children,
}: ViewSkeletonProps) {
  const { collapse } = useAppVisibility();

  return (
    <div className="dt-flex dt-max-h-full dt-flex-col">
      {(title || onBack || forehead) && (
        <div className="dt-relative dt-z-10 dt-border-b dt-border-b-slate-300 dt-bg-white dt-shadow-sm">
          <div className="dt-flex dt-flex-col dt-divide-y dt-divide-slate-200">
            {(title || onBack) && (
              <div className="dt-flex dt-flex-row dt-justify-between dt-gap-3 dt-p-3 dt-px-4">
                <div className="dt-flex-1">
                  {onBack && (
                    <Button onClick={onBack} aria-label="Back" title="Back">
                      <IoChevronBackOutline className="dt-h-4 dt-w-4" />
                    </Button>
                  )}
                </div>
                <div className="dt-flex dt-shrink dt-grow dt-flex-col dt-items-center dt-justify-center dt-gap-1 dt-overflow-hidden">
                  {superTitle && (
                    <div className="dt-max-w-full dt-overflow-hidden dt-text-ellipsis dt-whitespace-nowrap dt-text-xs dt-uppercase dt-tracking-wide dt-text-slate-500">
                      {superTitle}
                    </div>
                  )}
                  <div className="dt-max-w-full dt-overflow-hidden dt-text-ellipsis dt-whitespace-nowrap dt-font-semibold">
                    {title}
                  </div>
                </div>
                <div className="dt-flex-1"></div>
              </div>
            )}
            {forehead && <div className="dt-p-3 dt-px-4">{forehead}</div>}
          </div>
        </div>
      )}
      <div className="dt-shrink dt-grow dt-overflow-auto">{children}</div>

      <div className="dt-relative dt-z-10 dt-border-t dt-border-t-slate-300 dt-bg-white dt-p-3 dt-px-4">
        <div className="dt-flex dt-flex-row dt-items-center dt-justify-between dt-gap-3">
          <div>{chin}</div>
          <div className="-dt-m-1 dt-ml-0">
            <CollapseButton onClick={collapse} />
          </div>
        </div>
      </div>
    </div>
  );
}
