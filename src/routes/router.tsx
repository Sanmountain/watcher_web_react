import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Work from "../pages/Work";
import Vass from "../pages/vass/Vass";
import VassDetail from "../pages/vass/VassDetail";
import Layout from "../components/layout";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },

  {
    path: "/work",
    element: (
      <Layout>
        <Work />
      </Layout>
    ),
  },

  {
    path: "/vass",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "/vass", element: <Vass /> },
      { path: "/vass/:invoiceNumber", element: <VassDetail /> },
    ],
  },
]);
