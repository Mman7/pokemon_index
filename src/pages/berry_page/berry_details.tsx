import { useLocation, useNavigate } from "react-router";
import { Wrapper } from "../../components/wrapper";
import { ArrowLeftFromLine } from "lucide-react";
import { type Berry, type Item } from "pokenode-ts";
import Charts from "../../components/chart";
import ItemImg from "../../components/item_img";

export default function BerryDetails() {
  const location = useLocation();
  const nav = useNavigate();
  const state = location.state;
  const berry: Berry = state.berry;
  const itemData: Item = state.itemData;
  console.log(itemData);

  const baseStats: number[] = [
    berry.flavors[0].potency,
    berry.flavors[1].potency,
    berry.flavors[2].potency,
    berry.flavors[3].potency,
    berry.flavors[4].potency,
  ];

  const statsLabel = [
    berry.flavors[0].flavor.name,
    berry.flavors[1].flavor.name,
    berry.flavors[2].flavor.name,
    berry.flavors[3].flavor.name,
    berry.flavors[4].flavor.name,
  ];

  const eng = itemData?.flavor_text_entries.filter(
    (text) => text.language.name == "en",
  );

  return (
    <Wrapper>
      <div className="*:item-center flex-col p-6 *:justify-center *:text-center md:*:text-start">
        <button className="btn btn-wide text-xl" onClick={() => nav(-1)}>
          <ArrowLeftFromLine />
          Explore more item
        </button>
        <main className="mt-4 mb-10 flex flex-col gap-6 md:flex-row">
          <section className="flex w-full flex-1 rounded-2xl p-6 shadow-lg backdrop-brightness-120">
            <ItemImg
              alt={berry.name}
              src={itemData?.sprites?.default}
              imgClassName="size-64 aspect-square"
            />
          </section>
          <section className="flex w-full flex-2 flex-col gap-3 rounded-2xl p-10 shadow-lg backdrop-brightness-120">
            <div>
              <h1 className="text-2xl font-bold capitalize">
                <span className="text-gray-600 dark:text-gray-300">
                  #{berry?.id}
                </span>
                {` ${itemData?.name}`}
              </h1>
            </div>
            {itemData?.effect_entries[0]?.effect && (
              <h2 className="rounded-xl bg-gray-700 p-4 text-gray-300 xl:w-3/4">
                {eng?.[0]?.text && <p>{eng?.[0].text}</p>}
              </h2>
            )}
            <div className="flex flex-col gap-1 font-medium *:text-2xl">
              <h2>Cost : {itemData.cost}</h2>
              {itemData?.fling_power && (
                <h2>Fling Power : {itemData.fling_power}</h2>
              )}
            </div>
            <div className="rounded-xl bg-red-600/30 p-6 text-gray-50 capitalize xl:w-3/4">
              <h1 className="mb-1.5 text-xl font-medium">Berry Info</h1>
              <BerryLabel label="Growth Time" value={berry.growth_time} />
              <BerryLabel label="Max Harvest" value={berry.max_harvest} />
              <BerryLabel label="Size" value={berry.size} />
              <BerryLabel label="Smoothness" value={berry.smoothness} />
              <BerryLabel
                label="Natural Gift Type"
                value={berry.natural_gift_type.name}
              />
              <BerryLabel
                label="Natural Gift Power"
                value={berry.natural_gift_power}
              />
            </div>
            <div>
              <h1 className="mb-2 text-2xl font-bold">Category</h1>
              <div className="badge badge-neutral capitalize">
                {itemData.category.name}
              </div>
            </div>
            <section>
              <h1 className="mb-2 text-2xl font-bold">Attributes</h1>
              <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:justify-start">
                {itemData.attributes.map((element) => (
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
        <main className="mt-3 flex w-full flex-col gap-6 rounded shadow-lg xl:max-w-220">
          <Charts
            labelTitle="Item Flavour"
            ItemName={berry.name}
            stats={baseStats}
            statsLabel={statsLabel}
            chartType="bar"
          />
        </main>
      </div>
    </Wrapper>
  );
}

export function BerryLabel({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <h2>
      {label} :<span className="font-bold"> {value}</span>
    </h2>
  );
}
