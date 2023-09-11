import { GlobalStyles } from "./styles/globalStyles";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <GlobalStyles>
      <Outlet />
    </GlobalStyles>
  );
}

export default App;
