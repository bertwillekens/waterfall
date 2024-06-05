import React from "react";
import { type IconType } from "react-icons";
import tw from "twin.macro";

const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: IconType;
    size?: "sm" | "md";
  }
>((props, ref) => {
  const { size = "md", icon: Icon, ...restProps } = props;

  return (
    <button
      ref={ref}
      {...restProps}
      tw="disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon
        css={[
          tw`text-black`,
          size === "sm" && tw`h-4 w-4`,
          size === "md" && tw`h-5 w-5`,
        ]}
      />
    </button>
  );
});

export default IconButton;
