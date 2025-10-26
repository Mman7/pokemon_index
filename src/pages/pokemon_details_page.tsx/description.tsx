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

  return (
    <div className="shadow-x flex flex-col gap-3.5 rounded-2xl px-10 py-6 *:items-center *:text-center md:*:items-start md:*:text-start dark:backdrop-brightness-130">
      <h1 className="text-2xl font-bold capitalize">
        #{pokemonDetails.id} {pokemonDetails.name}
      </h1>
      <h2 className="hidden tracking-tight text-gray-500 xl:block dark:text-gray-300">
        {speciesDetails?.flavor_text_entries?.[6]?.flavor_text ?? ""}
      </h2>
      <div className="flex flex-col gap-1 font-medium text-gray-600 *:text-2xl dark:text-gray-300">
        <h2>Height : {pokemonDetails.height}0 cm</h2>
        <h2>Weight : {finalWeight} kgs</h2>
      </div>
      <div>
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
      </div>
    </div>
  );
}
