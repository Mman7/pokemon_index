import ItemCard from "./components/pokemon_item_card";
import Sidebar from "./components/Sidebar/sidebar";
export default function Body() {
  const elements = [];
  for (let i = 1; i <= 20; i++) {
    elements.push(
      <ItemCard key={i} imgSrc="" pokemonName="" pokemonTypes={[]} />,
    );
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content grid grid-cols-1 justify-items-center gap-6 p-6 md:grid-cols-2 md:justify-items-normal lg:grid-cols-3 xl:grid-cols-5">
        {/* Page content here */}
        {elements}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-70 p-4 sm:w-80">
          {/* Sidebar content here */}
          <Sidebar />
        </ul>
      </div>
    </div>
  );
}
