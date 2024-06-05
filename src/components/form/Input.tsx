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
        tw="mb-1 block text-sm font-medium leading-6 text-gray-900"
      >
        {labelText}
      </label>
      <div tw="mt-2">
        <input
          {...props}
          ref={ref}
          id={id}
          tw="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
});

export default Button;
