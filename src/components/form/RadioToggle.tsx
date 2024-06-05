import React from "react";

import { Radio, RadioGroup } from "@headlessui/react";
import tw from "twin.macro";

export type RadioToggleOption = {
  key: string;
  name: string;
};

export default function RadioToggle({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioToggleOption[];
}) {
  return (
    <fieldset aria-label={label}>
      <div tw="mb-1 flex items-center justify-between">
        <div tw="text-sm font-medium leading-6 text-gray-900">{label}</div>
      </div>

      <RadioGroup value={value} onChange={onChange} tw="flex gap-3">
        {options.map((option) => (
          <Radio key={option.name} value={option.key} as={React.Fragment}>
            {({ focus, checked }) => (
              <div
                css={[
                  focus ? tw`flex-1 ring-2 ring-indigo-600 ring-offset-2` : "",
                  checked
                    ? tw`bg-indigo-600 text-white hover:bg-indigo-500`
                    : tw`bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`,
                  tw`flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold uppercase sm:flex-1`,
                ]}
              >
                {option.name}
              </div>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
