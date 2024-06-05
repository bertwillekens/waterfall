import React, { useEffect, useMemo } from "react";
import { type Scenario, type Keyed } from "../../schema";
import yaml from "js-yaml";
import { serializeScenario, deserializeScenario } from "../../serialization";
import ViewSkeleton from "../layout/ViewSkeleton";
import Button from "../layout/Button";
import {
  IoCheckmarkOutline,
  IoCopyOutline,
  IoRefreshOutline,
} from "react-icons/io5";

export interface CodeInputScreenProps {
  value: Keyed<Scenario>;
  onChange: (value: Keyed<Scenario>) => void;
  onBack: () => void;
}

export default function CodeInputScreen({
  value,
  onChange,
  onBack,
}: CodeInputScreenProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [textAreaValue, setTextAreaValue] = React.useState<string>(
    yaml.dump(value),
  );
  const [inputValid, setInputValid] = React.useState<boolean>(true);

  useEffect(() => {
    setInputValid(true);
    setTextAreaValue(serializeScenario(value));
  }, [value]);

  const serializedScenario = useMemo(() => serializeScenario(value), [value]);

  const inputChanged = textAreaValue !== serializedScenario;

  useEffect(() => {
    setShowCopySuccess(false);
    const result = deserializeScenario(textAreaValue);
    if (result.success) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [textAreaValue]);

  const copyToClipboard: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("copy");
    if (textAreaRef.current) {
      console.log("copy");
      textAreaRef.current.select();
      document.execCommand("copy");
      setShowCopySuccess(true);
      // e.target.focus();
    }
  };

  const saveChanges = () => {
    const result = deserializeScenario(textAreaValue);
    if (result.success) {
      onChange(result.data);
      setTextAreaValue(serializeScenario(value));
    }
  };

  const resetChanges = () => {
    setTextAreaValue(serializedScenario);
  };

  const [showCopySuccess, setShowCopySuccess] = React.useState<boolean>(false);

  return (
    <ViewSkeleton
      title="YAML In/Out"
      onBack={onBack}
      chin={
        <>
          {inputChanged ? (
            inputValid ? (
              <>
                <div tw="text-sm text-amber-500">Edited</div>
                <Button onClick={saveChanges}>
                  <IoCheckmarkOutline tw="h-4 w-4" />
                  Save changes
                </Button>
              </>
            ) : (
              <>
                <div tw="text-sm text-red-500">Edited - Invalid</div>
                <Button onClick={resetChanges}>
                  <IoRefreshOutline tw="h-4 w-4" />
                  Reset
                </Button>
              </>
            )
          ) : (
            <div tw="flex flex-row items-center gap-3">
              <Button onClick={copyToClipboard}>
                <IoCopyOutline tw="h-4 w-4" />
                Copy
              </Button>
              {showCopySuccess && <div tw="text-sm text-green-600">Copied</div>}
            </div>
          )}
        </>
      }
    >
      <div tw="p-4">
        <textarea
          ref={textAreaRef}
          tw="h-96 w-full font-mono text-xs"
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
        />
      </div>
    </ViewSkeleton>
  );
}
