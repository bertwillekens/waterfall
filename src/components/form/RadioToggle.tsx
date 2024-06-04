import React from "react";

import { Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";

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
      <div className="dt-mb-1 dt-flex dt-items-center dt-justify-between">
        <div className="dt-text-sm dt-font-medium dt-leading-6 dt-text-gray-900">
          {label}
        </div>
      </div>

      <RadioGroup
        value={value}
        onChange={onChange}
        className="dt-flex dt-gap-3"
      >
        {options.map((option) => (
          <Radio
            key={option.name}
            value={option.key}
            className={({ focus, checked }) =>
              clsx(
                focus
                  ? "dt-flex-1 dt-ring-2 dt-ring-indigo-600 dt-ring-offset-2"
                  : "",
                checked
                  ? "dt-bg-indigo-600 dt-text-white hover:dt-bg-indigo-500"
                  : "dt-bg-white dt-text-gray-900 dt-ring-1 dt-ring-inset dt-ring-gray-300 hover:dt-bg-gray-50",
                "dt-flex dt-items-center dt-justify-center dt-rounded-md dt-px-3 dt-py-2 dt-text-sm dt-font-semibold dt-uppercase sm:dt-flex-1",
              )
            }
          >
            {option.name}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
