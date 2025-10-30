import { useLocation, useNavigate } from "react-router";
import { Wrapper } from "../../components/wrapper";
import { ArrowLeftFromLine } from "lucide-react";
import type { Item } from "pokenode-ts";

export default function ItemDetails() {
  const location = useLocation();
  const nav = useNavigate();
  const state = location.state;
  const item: Item = state.item;

  return (
    <Wrapper>
      <div className="flex-col p-6">
        <button
          className="btn btn-wide text-xl"
          onClick={() => nav("..", { state: { ...state } })}
        >
          <ArrowLeftFromLine />
          Explore more item
        </button>
        <main className="mt-4 flex w-full flex-col gap-6 rounded p-6 shadow-lg md:grid md:grid-cols-2 dark:bg-black/10">
          <figure className="flex items-center justify-center rounded-xl bg-sky-200/10 dark:bg-black/20">
            <img className="w-32" src={item.sprites.default} alt={item.name} />
          </figure>
          <section className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-bold capitalize">
                <span className="text-gray-600 dark:text-gray-300">
                  #{item.id}
                </span>
                {` ${item.name}`}
              </h1>
              <h2 className="text-gray-400">
                {item.flavor_text_entries[0].text}
              </h2>
            </div>

            <h2 className="text-gray-800 dark:text-gray-300">
              {item.effect_entries[0].effect}
            </h2>
            <div className="flex flex-col gap-1 font-medium *:text-2xl">
              <h2>Cost : {item.cost}</h2>
              {item.fling_power && <h2>Fling Power : {item.fling_power}</h2>}
            </div>
            <div>
              <h1 className="mb-2 text-2xl font-bold">Category</h1>
              <div className="badge badge-neutral capitalize">
                {item.category.name}
              </div>
            </div>
            <section>
              <h1 className="mb-2 text-2xl font-bold">Attributes</h1>
              <div className="flex flex-row flex-wrap gap-2">
                {item.attributes.map((element) => (
                  <div
                    key={element.name}
                    className="badge badge-neutral capitalize"
                  >
                    {element.name}
                  </div>
                ))}
              </div>
            </section>
          </section>
        </main>
      </div>
    </Wrapper>
  );
}
