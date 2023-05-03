import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Main from "./routes/Main";
import Work from "./routes/Work";
import Vass from "./routes/VASS";
import Header from "./components/Header";
import NotFound from "./routes/NotFound";
import VassCam from "./routes/VassCam";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/work" element={<Work />}></Route>
        <Route path="/vass" element={<Vass />}></Route>
        <Route path="/vasscam" element={<VassCam />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
