import type { Pokemon } from "pokenode-ts";

export default function SpiritesShow({ data }: { data: Pokemon }) {
  const female = data.sprites.front_female !== null;
  const shiny = data.sprites.back_shiny !== null;

  return (
    <div className="grid-row-2 flex gap-4 md:grid md:grid-cols-2">
      <SpiritesItem
        src={data.sprites.front_default ?? ""}
        alt={`${data.name}-front`}
      />
      <SpiritesItem
        src={data.sprites.back_default ?? ""}
        alt={`${data.name}-back`}
      />

      {female && (
        <SpiritesItem
          src={data.sprites.front_female ?? ""}
          alt={`${data.name}-front-female`}
        />
      )}
      {female && (
        <SpiritesItem
          src={data.sprites.back_female ?? ""}
          alt={`${data.name}-front-female-shiny`}
        />
      )}
      {shiny && (
        <SpiritesItem
          src={data.sprites.front_shiny ?? ""}
          alt={`${data.name}-front-female-shiny`}
        />
      )}
      {shiny && (
        <SpiritesItem
          src={data.sprites.back_shiny ?? ""}
          alt={`${data.name}-back-female-shiny`}
        />
      )}
    </div>
  );
}

function SpiritesItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex rounded-2xl p-4 shadow backdrop-brightness-90">
      <img className="w-3xs" src={src} alt={alt} />
    </div>
  );
}
