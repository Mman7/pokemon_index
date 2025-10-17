import { LazyLoadImage } from "react-lazy-load-image-component";

interface ItemCardProps {
  imgSrc: string;
  pokemonName: string;
  pokemonTypes: string[];
}

export default function ItemCard({
  imgSrc,
  pokemonName,
  pokemonTypes,
}: ItemCardProps) {
  return (
    <div className="card rounded-xl shadow-lg backdrop-brightness-125">
      <figure className="px-6 pt-6">
        <div className="rounded-2xl bg-black/5">
          <LazyLoadImage
            className="w-64"
            alt={pokemonName}
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
            }
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Bulbasour</h2>
      </div>
    </div>
  );
}
