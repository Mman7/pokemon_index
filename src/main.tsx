import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router";
import PokemonDetails from "./pages/pokemon_page.tsx/pokemon_details.tsx";
import BerryLayout from "./pages/berry_page/berry_layout.tsx";
import BerryDetails from "./pages/berry_page/berry_details.tsx";
import ItemDetails from "./pages/item_page/item_details.tsx";
import ItemLayout from "./pages/item_page/item_layout.tsx";
import Home from "./pages/homepage/home_page.tsx";
import PokemonLayout from "./pages/pokemon_page.tsx/pokemon_layout.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary
        fallback={
          <div className="bg-red-700">React said: Something went wrong</div>
        }
      >
        <App />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },

      {
        path: "pokemon",
        element: <Layout />,
        children: [
          { index: true, element: <PokemonLayout /> },
          { path: ":name", element: <PokemonDetails /> },
        ],
      },
      {
        path: "berry",
        element: <Layout />,
        children: [
          { index: true, element: <BerryLayout /> },
          { path: ":name", element: <BerryDetails /> },
        ],
      },
      {
        path: "item",
        element: <Layout />,
        children: [
          { index: true, element: <ItemLayout /> },
          { path: ":name", element: <ItemDetails /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallback={
          <div className="bg-red-700">React said: Something went wrong</div>
        }
      >
        <RouterProvider router={router} />

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);

export default function Layout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
