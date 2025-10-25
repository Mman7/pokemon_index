import { TypeBadges } from "../../components/type_badges";
import type { Pokemon } from "pokenode-ts";

export default function Description({
  pokemonDetails,
}: {
  pokemonDetails: Pokemon;
}) {
  const weight = pokemonDetails.weight.toString();
  let finalWeight = weight.slice(0, -1);

  return (
    <div className="shadow-x flex flex-col gap-5 rounded-2xl p-10 backdrop-brightness-95 *:text-center md:*:text-start dark:backdrop-brightness-130">
      <h1 className="text-2xl font-bold capitalize">
        #{pokemonDetails.id} {pokemonDetails.name}
      </h1>
      <div className="flex flex-col gap-1">
        <h2 className="text-gray-600 dark:text-gray-300">
          Height : {pokemonDetails.height}0 cm
        </h2>
        <h2 className="text-gray-600 dark:text-gray-300">
          Weight : {finalWeight} kgs
        </h2>
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
      </div>
    </div>
  );
}
