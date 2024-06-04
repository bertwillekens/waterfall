import clsx from "clsx";
import React from "react";
import { type IconType } from "react-icons";

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
      className={clsx("disabled:dt-cursor-not-allowed disabled:dt-opacity-50")}
    >
      <Icon
        className={clsx(
          "dt-text-black",
          size === "sm" && "dt-h-4 dt-w-4",
          size === "md" && "dt-h-5 dt-w-5",
        )}
      />
    </button>
  );
});

export default IconButton;
