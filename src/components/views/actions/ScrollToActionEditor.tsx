import React from "react";
import {
  type DurationType,
  type Keyed,
  type AnimateScrollAction,
} from "../../../schema";
import Input from "../../form/Input";
import Button from "../../layout/Button";
import RadioToggle from "../../form/RadioToggle";
import { FormLockup } from "../../form/FormLockup";
import { ActionCardWithButtons } from "./ActionCard";
import {
  DEFAULT_ANIMATE_SCROLL_DURATION,
  DEFAULT_ANIMATE_SCROLL_SPEED,
} from "../../../playback";

export function ScrollToActionEditor({
  action,
  onChange,
  onDelete,
  onPlay,
  disablePlay,
  isPlaying,
}: {
  action: Keyed<AnimateScrollAction>;
  onChange: (action: Keyed<AnimateScrollAction>) => void;
  onDelete?: () => void;
  onPlay?: () => void;
  disablePlay?: boolean;
  isPlaying?: boolean;
}) {
  const setToCurrentPosition = () => {
    onChange({ ...action, y: window.scrollY });
  };
  return (
    <ActionCardWithButtons
      title="Animate scroll"
      action={action}
      onChange={onChange}
      onDelete={onDelete}
      onPlay={onPlay}
      disablePlay={disablePlay}
      isPlaying={isPlaying}
    >
      <FormLockup>
        <div className="dt-flex dt-gap-3">
          <div className="dt-flex-1">
            <Input
              labelText={"Destination Y"}
              type="number"
              value={action.y}
              onChange={(e) =>
                onChange({ ...action, y: Number(e.target.value) })
              }
            />
          </div>
          <div className="dt-flex dt-flex-1 dt-flex-col dt-justify-end">
            <Button onClick={setToCurrentPosition}>Set current position</Button>
          </div>
        </div>
        <div className="dt-flex dt-gap-3">
          <div className="dt-flex-1">
            <RadioToggle
              label="Duration type"
              value={action.durationType}
              onChange={(durationType) =>
                onChange({
                  ...action,
                  durationType: durationType as DurationType,
                })
              }
              options={[
                { key: "speed", name: "Speed" },
                { key: "duration", name: "Duration" },
              ]}
            />
          </div>
          <div className="dt-flex-1">
            {action.durationType === "speed" ? (
              <Input
                labelText={"Speed (px/s)"}
                type="number"
                value={action.speed || ""}
                onChange={(e) =>
                  onChange({
                    ...action,
                    speed: Number(e.target.value) || undefined,
                  })
                }
                placeholder={DEFAULT_ANIMATE_SCROLL_SPEED.toString()}
              />
            ) : (
              <Input
                labelText={"Duration (ms)"}
                type="number"
                value={action.duration || ""}
                onChange={(e) =>
                  onChange({
                    ...action,
                    duration: Number(e.target.value) || undefined,
                  })
                }
                placeholder={DEFAULT_ANIMATE_SCROLL_DURATION.toString()}
              />
            )}
          </div>
        </div>
      </FormLockup>
    </ActionCardWithButtons>
  );
}
