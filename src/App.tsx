import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "./assets/theme";
import { GlobalStyle } from "./components/GlobalStyle";
import Router from "./components/Router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Router />
        <GlobalStyle />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
