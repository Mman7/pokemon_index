import { Navigate, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar/sidebar";
import PokemonList from "./pages/pokemon_page.tsx/pokemon_layout";
import PokemonDetails from "./pages/pokemon_page.tsx/pokemon_details";
import Home from "./pages/homepage/home_page";
import ItemLayout from "./pages/item_page/item_layout";
import ItemDetails from "./pages/item_page/item_details";
import BerryLayout from "./pages/berry_page/berry_layout";
import BerryDetails from "./pages/berry_page/berry_details";
export default function Body() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/pokemon" element={<PokemonList />}>
            <Route path=":name" element={<PokemonDetails />} />
          </Route>
          <Route path="/berry" element={<BerryLayout />}>
            <Route path=":name" element={<BerryDetails />} />
          </Route>
          <Route path="/item" element={<ItemLayout />}>
            <Route path=":name" element={<ItemDetails />} />
          </Route>
        </Routes>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
}
