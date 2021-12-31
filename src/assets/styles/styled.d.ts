import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      light_dark: string;
      dark: string;
      text: string;
      accent: string;
    };
  }
}
