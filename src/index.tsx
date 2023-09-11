import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { router } from "./routes/router";
import { GlobalStyles } from "./styles/globalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <GlobalStyles />
      <RouterProvider router={router} />
    </RecoilRoot>
  </QueryClientProvider>,
);
