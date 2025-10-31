import { TypeBadges } from "../../components/type_badges";
import type { Pokemon, PokemonSpecies } from "pokenode-ts";

export default function Description({
  pokemonDetails,
  speciesDetails,
}: {
  pokemonDetails: Pokemon;
  speciesDetails?: PokemonSpecies;
}) {
  const weight = pokemonDetails.weight.toString();
  let finalWeight = weight.slice(0, -1);
  const eng = speciesDetails?.flavor_text_entries.filter(
    (text) => text.language.name == "en",
  );

  return (
    <main className="flex w-72 flex-col gap-3.5 rounded-2xl p-3 *:items-center *:text-center md:w-1/2 md:*:items-start md:*:text-start">
      <section>
        <h1 className="text-2xl font-bold capitalize">
          #{pokemonDetails.id} {pokemonDetails.name}
        </h1>
        <h2 className="block tracking-tight text-gray-500 dark:text-gray-300">
          {eng?.[0].flavor_text}
        </h2>
      </section>
      <section className="flex flex-col gap-1 font-medium text-gray-600 *:text-2xl dark:text-gray-300">
        <h2>Height : {pokemonDetails.height}0 cm</h2>
        <h2>Weight : {finalWeight} kgs</h2>
      </section>
      <section>
        <h1 className="mb-2 text-2xl font-bold">TYPE</h1>
        <div className="flex items-center justify-center gap-2 md:justify-start">
          {pokemonDetails.types.map((type) => (
            <TypeBadges
              fontSize="text-lg p-4"
              key={type.type.name}
              type={type.type.name}
            />
          ))}
        </div>
        <div className="pt-3">
          <h1 className="mb-2 text-2xl font-bold">Ability</h1>
          <div className="m-0 flex flex-row flex-wrap items-center justify-center gap-2 md:justify-start">
            {pokemonDetails.abilities.map((type) => (
              <div
                key={type.ability.name}
                className="badge badge-ghost p-4 text-lg capitalize"
              >
                {type.ability.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
