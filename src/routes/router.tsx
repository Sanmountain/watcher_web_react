import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Work from "../pages/Work";
import Vass from "../pages/vass/Vass";
import VassDetail from "../pages/vass/VassDetail";
import Layout from "../components/layout";
import LoginRoute from "./LoginRouter";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: (
      <LoginRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </LoginRoute>
    ),
  },

  {
    path: "/work",
    element: (
      <LoginRoute>
        <Layout>
          <Work />
        </Layout>
      </LoginRoute>
    ),
  },

  {
    path: "/vass",
    element: (
      <LoginRoute>
        <Layout>
          <Outlet />
        </Layout>
      </LoginRoute>
    ),
    children: [
      { path: "/vass", element: <Vass /> },
      { path: "/vass/:invoiceNumber", element: <VassDetail /> },
    ],
  },
]);
