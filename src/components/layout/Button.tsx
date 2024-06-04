import clsx from "clsx";
import React from "react";

//Button component that passes prop and ref in TS

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "sm" | "md";
  }
>((props, ref) => {
  const { size = "md" } = props;

  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "dt-inline-flex dt-items-center dt-justify-center dt-rounded-md dt-bg-white dt-font-semibold dt-text-gray-900 dt-shadow-sm dt-ring-1 dt-ring-inset dt-ring-gray-300 hover:dt-bg-gray-50 disabled:dt-cursor-not-allowed disabled:dt-opacity-50 disabled:hover:dt-bg-white",
        size === "sm" && "dt-gap-1.5 dt-px-2 dt-py-1 dt-text-xs",
        size === "md" && "dt-gap-1.5 dt-px-3 dt-py-2 dt-text-sm",
      )}
    >
      {props.children}
    </button>
  );
});

export default Button;
