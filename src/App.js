import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Work from "./routes/Work";
import Vass from "./routes/VASS";
import Header from "./components/Header";
import VassCam from "./routes/VassCam";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/work" element={<Work />}></Route>
        <Route path="/vass" element={<Vass />}></Route>
        <Route path="/vasscam" element={<VassCam />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
