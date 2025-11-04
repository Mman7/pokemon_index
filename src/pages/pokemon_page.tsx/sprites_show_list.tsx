import type { Pokemon } from "pokenode-ts";

export default function SpiritesShow({ data }: { data: Pokemon }) {
  const female: boolean = data.sprites.front_female !== null;
  const shiny: boolean = data.sprites.back_shiny !== null;

  return (
    <div className="w-full gap-6 rounded-2xl p-6 shadow-xl dark:backdrop-brightness-120">
      <h1 className="mb-3 text-center text-2xl font-bold md:text-start">
        Variants
      </h1>
      <div className="grid-row-2 grid grid-cols-2 items-center justify-center gap-4">
        <SpiritesItem
          className="bg-primary/70 dark:bg-primary/30"
          src={data.sprites.front_default ?? null}
          alt={`${data.name}-front`}
        />
        <SpiritesItem
          className="bg-primary/70 dark:bg-primary/30"
          src={data.sprites.back_default}
          alt={`${data.name}-back`}
        />

        {female && (
          <SpiritesItem
            className="bg-secondary/70 dark:bg-secondary/30"
            src={data.sprites.front_female ?? null}
            alt={`${data.name}-front-female`}
          />
        )}
        {female && (
          <SpiritesItem
            className="bg-secondary/70 dark:bg-secondary/30"
            src={data.sprites.back_female ?? null}
            alt={`${data.name}-front-female-shiny`}
          />
        )}
        {shiny && (
          <SpiritesItem
            className="bg-accent/70 dark:bg-accent/30"
            src={data.sprites.front_shiny ?? null}
            alt={`${data.name}-front-female-shiny`}
          />
        )}
        {shiny && (
          <SpiritesItem
            className="bg-accent/70 dark:bg-accent/30"
            src={data.sprites.back_shiny ?? null}
            alt={`${data.name}-back-female-shiny`}
          />
        )}
      </div>
    </div>
  );
}

function SpiritesItem({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`${src == "" || (src == null && "hidden")} flex items-center justify-center rounded-2xl p-4 shadow-xl backdrop-brightness-90 ${className}`}
    >
      <img className="w-3xs" src={src == null ? undefined : src} alt={alt} />
    </div>
  );
}
