import { useLocation, useNavigate } from "react-router";
import { Wrapper } from "../../components/wrapper";
import { ArrowLeftFromLine } from "lucide-react";
import type { Item } from "pokenode-ts";
import ItemImg from "../../components/item_img";

export default function ItemDetails() {
  const location = useLocation();
  const nav = useNavigate();
  const state = location.state;
  const item: Item = state.item;
  const eng = item?.flavor_text_entries.filter(
    (text) => text.language.name == "en",
  );
  const itemEffectEng = item.effect_entries.filter(
    (text) => text.language.name == "en",
  );

  console.log(itemEffectEng);
  return (
    <Wrapper>
      <div className="*:item-center flex-col p-6 *:justify-center *:text-center md:*:text-start">
        <button className="btn btn-wide text-xl" onClick={() => nav(-1)}>
          <ArrowLeftFromLine />
          Explore more item
        </button>
        <main className="mt-4 flex w-full flex-col gap-6 p-6 md:grid md:grid-cols-2">
          <section className="flex rounded-2xl p-6 shadow-lg backdrop-brightness-120">
            <ItemImg
              alt={item.name}
              src={item.sprites.default}
              imgClassName="size-64 m-auto aspect-square"
            />
          </section>
          <section className="flex flex-col gap-3 rounded-2xl p-6 shadow-lg backdrop-brightness-120">
            <div>
              <h1 className="text-2xl font-bold capitalize">
                <span className="text-gray-600 dark:text-gray-300">
                  #{item.id}
                </span>
                {` ${item.name}`}
              </h1>
              {eng?.[0]?.text && <h2>{eng?.[0].text}</h2>}
            </div>
            {item.effect_entries[0]?.effect && (
              <h2 className="rounded-xl bg-gray-700 p-3 text-gray-300">
                {itemEffectEng[0].effect}
              </h2>
            )}
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
              <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:justify-start">
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
