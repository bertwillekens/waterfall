import {
  scopedPreflightStyles,
  isolateInsideOfContainer, // there are also isolateOutsideOfContainer and isolateForComponents
} from 'tailwindcss-scoped-preflight';
import formsPlugin from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dt-',
  content: ["./src/**/*.{ts,tsx,html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    formsPlugin,
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('#demo-tool'),
    }),
  ],
}

