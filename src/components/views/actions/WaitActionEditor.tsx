import React from "react";
import { type Keyed, type WaitAction, type WaitForType } from "../../../schema";
import Input from "../../form/Input";
import RadioToggle from "../../form/RadioToggle";
import { FormLockup } from "../../form/FormLockup";
import { ActionCardWithButtons } from "./ActionCard";
import { DEFAULT_WAIT_TIMEOUT_DURATION } from "../../../playback";

export function WaitActionEditor({
  action,
  onChange,
  onDelete,
  onPlay,
  disablePlay,
  isPlaying,
}: {
  action: Keyed<WaitAction>;
  onChange: (action: Keyed<WaitAction>) => void;
  onDelete?: () => void;
  onPlay?: () => void;
  disablePlay?: boolean;
  isPlaying?: boolean;
}) {
  return (
    <ActionCardWithButtons
      title="Wait"
      action={action}
      onChange={onChange}
      onDelete={onDelete}
      onPlay={onPlay}
      disablePlay={disablePlay}
      isPlaying={isPlaying}
    >
      <FormLockup>
        <div tw="flex gap-3">
          <div tw="flex-1">
            <RadioToggle
              label="Wait for"
              value={action.waitForType}
              onChange={(waitForType) =>
                onChange({
                  ...action,
                  waitForType: waitForType as WaitForType,
                })
              }
              options={[
                { name: "Timeout", key: "timeout" },
                { name: "Spacebar", key: "spacebar" },
              ]}
            />
          </div>
          <div tw="flex-1">
            {action.waitForType === "timeout" && (
              <Input
                labelText={"Duration (ms)"}
                type="number"
                value={action.timeoutDuration || ""}
                onChange={(e) =>
                  onChange({
                    ...action,
                    timeoutDuration: Number(e.target.value) || undefined,
                  })
                }
                placeholder={DEFAULT_WAIT_TIMEOUT_DURATION.toString()}
              />
            )}
          </div>
        </div>
      </FormLockup>
    </ActionCardWithButtons>
  );
}
