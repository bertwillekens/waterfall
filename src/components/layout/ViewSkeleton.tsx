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
    <div tw="flex max-h-full flex-col">
      {(title || onBack || forehead) && (
        <div tw="relative z-10 border-b border-b-slate-300 bg-white shadow-sm">
          <div tw="flex flex-col divide-y divide-slate-200">
            {(title || onBack) && (
              <div tw="flex flex-row justify-between gap-3 p-3 px-4">
                <div tw="flex-1">
                  {onBack && (
                    <Button onClick={onBack} aria-label="Back" title="Back">
                      <IoChevronBackOutline tw="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div tw="flex shrink grow flex-col items-center justify-center gap-1 overflow-hidden">
                  {superTitle && (
                    <div tw="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs uppercase tracking-wide text-slate-500">
                      {superTitle}
                    </div>
                  )}
                  <div tw="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                    {title}
                  </div>
                </div>
                <div tw="flex-1"></div>
              </div>
            )}
            {forehead && <div tw="p-3 px-4">{forehead}</div>}
          </div>
        </div>
      )}
      <div tw="shrink grow overflow-auto">{children}</div>

      <div tw="relative z-10 border-t border-t-slate-300 bg-white p-3 px-4">
        <div tw="flex flex-row items-center justify-between gap-3">
          <div>{chin}</div>
          <div tw="-m-1 ml-0">
            <CollapseButton onClick={collapse} />
          </div>
        </div>
      </div>
    </div>
  );
}
