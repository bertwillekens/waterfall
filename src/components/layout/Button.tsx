import React from "react";
import tw from "twin.macro";

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
      css={[
        tw`inline-flex items-center justify-center rounded-md bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white`,
        size === "sm" && tw`gap-1.5 px-2 py-1 text-xs`,
        size === "md" && tw`gap-1.5 px-3 py-2 text-sm`,
      ]}
    >
      {props.children}
    </button>
  );
});

export default Button;
