import { Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar/sidebar";
import PokemonList from "./pages/pokemon_list";
import PokemonDetails from "./pages/pokemon_details_page.tsx/pokemon_details";
import Home from "./pages/homepage/home_page";
export default function Body() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
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
