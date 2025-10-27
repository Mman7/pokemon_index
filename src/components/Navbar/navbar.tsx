import Searchbar from "./search_bar";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAllPokemonNames } from "../../api/pokemon_api";
import { useQuery } from "@tanstack/react-query";
import type { NamedAPIResource, NamedAPIResourceList } from "pokenode-ts";

const splitIdFromLink = (link: string): string => {
  return link.split("/")[6];
};

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setFocus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isPokemonPage = location.pathname === "/pokemon";
  const [results, setResults] = useState<NamedAPIResourceList | undefined>(
    undefined,
  );

  const { data: PokemonNames } = useQuery({
    queryKey: ["all"],
    queryFn: getAllPokemonNames,
  });

  useEffect(() => {
    if (!isPokemonPage || !PokemonNames) return;
    if (inputValue == "") {
      setResults(undefined);
      navigate("/pokemon", {
        state: { ...location.state, searchData: [], searchInput: "" },
      });
      return;
    }

    // Handle search
    const timeout = setTimeout(() => {
      if (!isPokemonPage) return;
      const filterList = PokemonNames?.results.filter((p: NamedAPIResource) =>
        p.name.toLowerCase().includes(inputValue.toLowerCase()),
      );
      if (inputValue !== "") {
        navigate("/pokemon", {
          state: {
            ...location.state,
            searchData: filterList.slice(0, 10),
            searchInput: inputValue,
          },
        });
      }
      setResults({ ...PokemonNames, results: filterList.slice(0, 10) });
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
      <div className="navbar-start">
        <label
          htmlFor="my-drawer-3"
          className="btn border-0 bg-transparent lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <div className="ml-4 hidden items-center md:block">
          <img className="w-50" src={logo} alt="Pokemon Index" />
        </div>
      </div>
      <div className="navbar-center">
        <div
          className={`ml-4 items-center ${isHomePage ? "block md:hidden" : "hidden"} `}
        >
          <img className="w-50" src={logo} alt="Pokemon Index" />
        </div>
        <div className="relative">
          <Searchbar
            setFocus={setFocus}
            value={inputValue}
            setInputValue={setInputValue}
            isHidden={location.pathname !== "/pokemon"}
          />
          <div
            id="search-results"
            className={` ${inputValue !== "" ? "block" : "hidden"} bg-base-100 absolute z-10 mt-1 w-full rounded-lg text-black capitalize shadow-lg dark:text-white`}
          >
            <ul
              className={`${!isFocus && "hidden"} divide-yp-1 backdrop-brightness-140`}
            >
              {results?.results.map((pokemon, index) => (
                <li
                  key={index}
                  onClick={() => setInputValue(pokemon.name)}
                  className="cursor-pointer rounded-md p-2 capitalize transition hover:bg-red-700 active:bg-red-800"
                >
                  <span className="text-gray-400">
                    #{splitIdFromLink(pokemon.url)}
                  </span>{" "}
                  {pokemon.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
