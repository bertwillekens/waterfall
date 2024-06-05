import "twin.macro";
import { type css as cssImport } from "@emotion/react";
import type styledImport from "@emotion/styled";
import { type CSSInterpolation } from "@emotion/serialize";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module "react" {
  // The tw and css prop
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
