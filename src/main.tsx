import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import PokemonDetails from "./pages/pokemon_page.tsx/pokemon_details.tsx";
import BerryDetails from "./pages/berry_page/berry_details.tsx";
import ItemDetails from "./pages/item_page/item_details.tsx";
import Home from "./pages/homepage/home_page.tsx";
import { ListLayout } from "./components/list_layout.tsx";
import {
  getBerryList,
  getItemList,
  getPokemonsList,
} from "./api/pokemon_api.tsx";
import PokemonCard from "./components/pokemon_item_card.tsx";
import BerryCard from "./pages/berry_page/berry_card.tsx";
import ItemCard from "./pages/item_page/item_card.tsx";

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
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <ListLayout
                ItemComponent={PokemonCard}
                queryKey={["pokemon"]}
                queryFn={(pageParam) => getPokemonsList(pageParam)}
              />
            ),
          },
          { path: ":name", element: <PokemonDetails /> },
        ],
      },
      {
        path: "item",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <ListLayout
                ItemComponent={ItemCard}
                queryKey={["items"]}
                queryFn={(pageParam) => getItemList(pageParam)}
              />
            ),
          },
          { path: ":name", element: <ItemDetails /> },
        ],
      },
      {
        path: "berry",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <ListLayout
                ItemComponent={BerryCard}
                queryKey={["berry"]}
                queryFn={(pageParam) => getBerryList(pageParam)}
              />
            ),
          },
          { path: ":name", element: <BerryDetails /> },
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
