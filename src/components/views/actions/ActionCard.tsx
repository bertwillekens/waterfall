import React, { type PropsWithChildren } from "react";
import { type Keyed, type GenericAction } from "../../../schema";
import { IoPlayOutline, IoTrashBinOutline } from "react-icons/io5";
import { Card } from "../../layout/Card";
import IconButton from "../../layout/IconButton";

interface ActionCardProps extends PropsWithChildren {
  title: string;
  buttons?: React.ReactNode;
  locked?: boolean;
  inactive?: boolean;
  isPlaying?: boolean;
}
export function ActionCard({
  title,
  buttons,
  locked,
  inactive,
  isPlaying,
  children,
}: ActionCardProps) {
  return (
    <Card
      headerContent={
        <div className="dt-flex dt-flex-row dt-items-start dt-justify-between dt-gap-3">
          <div>{title}</div>
          {buttons && (
            <div className="dt-flex dt-flex-row dt-items-center dt-justify-between dt-gap-3">
              {buttons}
            </div>
          )}
        </div>
      }
      locked={locked}
      inactive={inactive}
      showRing={isPlaying}
    >
      {children}
    </Card>
  );
}

interface ActionCardWithButtonsProps<TAction extends Keyed<GenericAction>>
  extends PropsWithChildren {
  title: string;
  action: TAction;
  onChange: (action: TAction) => void;
  onDelete?: () => void;
  onPlay?: () => void;
  disablePlay?: boolean;
  isPlaying?: boolean;
  locked?: boolean;
  inactive?: boolean;
}
export function ActionCardWithButtons<TAction extends Keyed<GenericAction>>({
  title,
  onDelete,
  onPlay,
  disablePlay,
  isPlaying,
  children,
  locked,
  inactive,
}: ActionCardWithButtonsProps<TAction>) {
  return (
    <ActionCard
      title={title}
      buttons={
        <>
          {onPlay && (
            <IconButton
              aria-label="Play"
              title="Play"
              disabled={disablePlay}
              icon={IoPlayOutline}
              onClick={onPlay}
            ></IconButton>
          )}
          {onDelete && (
            <IconButton
              aria-label="Delete"
              title="Delete"
              icon={IoTrashBinOutline}
              onClick={onDelete}
            ></IconButton>
          )}
        </>
      }
      locked={locked}
      inactive={inactive}
      isPlaying={isPlaying}
    >
      {children}
    </ActionCard>
  );
}
