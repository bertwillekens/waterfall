import React, { useId } from "react";

//Button component that passes prop and ref in TS

const Button = React.forwardRef<
  HTMLInputElement,
  { labelText: string } & React.InputHTMLAttributes<HTMLInputElement>
>(({ labelText, ...props }, ref) => {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="dt-mb-1 dt-block dt-text-sm dt-font-medium dt-leading-6 dt-text-gray-900"
      >
        {labelText}
      </label>
      <div className="mt-2">
        <input
          {...props}
          ref={ref}
          id={id}
          className="dt-block dt-w-full dt-rounded-md dt-border-0 dt-py-1.5 dt-text-gray-900 dt-shadow-sm dt-ring-1 dt-ring-inset dt-ring-gray-300 placeholder:dt-text-gray-400 focus:dt-ring-2 focus:dt-ring-inset focus:dt-ring-indigo-600 sm:dt-text-sm sm:dt-leading-6"
        />
      </div>
    </div>
  );
});

export default Button;
