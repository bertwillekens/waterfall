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
                <div className="dt-text-sm dt-text-amber-500">Edited</div>
                <Button onClick={saveChanges}>
                  <IoCheckmarkOutline className="dt-h-4 dt-w-4" />
                  Save changes
                </Button>
              </>
            ) : (
              <>
                <div className="dt-text-sm dt-text-red-500">
                  Edited - Invalid
                </div>
                <Button onClick={resetChanges}>
                  <IoRefreshOutline className="dt-h-4 dt-w-4" />
                  Reset
                </Button>
              </>
            )
          ) : (
            <div className="dt-flex dt-flex-row dt-items-center dt-gap-3">
              <Button onClick={copyToClipboard}>
                <IoCopyOutline className="dt-h-4 dt-w-4" />
                Copy
              </Button>
              {showCopySuccess && (
                <div className="dt-text-sm dt-text-green-600">Copied</div>
              )}
            </div>
          )}
        </>
      }
    >
      <div className="dt-p-4">
        <textarea
          ref={textAreaRef}
          className="dt-h-96 dt-w-full dt-font-mono dt-text-xs"
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
        />
      </div>
    </ViewSkeleton>
  );
}
