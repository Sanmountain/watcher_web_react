import { breakPoints } from "./breakPoints";

type MediaFunction = (style: string) => string;

export const mediaQuery: Record<string, MediaFunction> = {
  medium: (style) => `
    @media (max-width: ${breakPoints.medium}px) {
      ${style}
    }
  `,
  largeMedium: (style) => `
    @media (max-width: ${breakPoints.largeMedium}px) {
      ${style}
    }
  `,
  large: (style) => `
    @media (max-width: ${breakPoints.large}px) {
      ${style}
    }
  `,
};
