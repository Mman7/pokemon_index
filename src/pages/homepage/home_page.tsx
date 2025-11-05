import PokeBall from "../../assets/Poké_Ball_icon.svg";

export default function Home() {
  return (
    <div className="flex h-[calc(100dvh-5rem)] w-full flex-col gap-6 p-6">
      <span className="flex items-center gap-2">
        <img src={PokeBall} alt="PokeBall" className="w-24" />
        <h1 className="text-4xl font-medium">Welcome to Pokémon Index</h1>
      </span>
      <h2 className="text-center text-lg text-gray-700 sm:text-start dark:text-gray-400">
        Discover the world of Pokémon like never before! From the original 151
        to the newest generations, our index helps you explore every Pokémon’s
        types, abilities, stats, and evolutions. Whether you’re a trainer,
        collector, or fan, there’s something here for everyone.
      </h2>
      <ul className="list-disc px-6 text-gray-700 dark:text-gray-400">
        <li>Browse Pokémon by name</li>
        <li>View detailed stats, moves, and evolution paths.</li>
        <li>Stay up-to-date with new Pokémon releases and game updates.</li>
      </ul>
      <div className="mt-auto">
        <span className="flex flex-wrap gap-2">
          <h1 className="text-gray-400">Built with :</h1>
          <div className="badge badge-soft badge-info">ReactJS</div>
          <div className="badge badge-soft badge-info">TypeScript</div>
          <div className="badge badge-soft badge-info">TailwindCSS</div>
          <div className="badge badge-soft badge-secondary">ReactQuery</div>
          <div className="badge badge-soft badge-warnning">DaisyUI</div>
        </span>
      </div>
    </div>
  );
}
