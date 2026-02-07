import Searchbar from "./search_bar";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { namesListByCondition } from "../../api/pokemon_api";
import { useQuery } from "@tanstack/react-query";
import type { NamedAPIResource } from "pokenode-ts";
import { X } from "lucide-react";

const splitIdFromLink = (link: string): string => {
  return link.split("/")[6];
};

export default function Navbar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocus, setFocus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchResults = searchParams.get("search");

  const isHomePage: boolean =
    location.pathname === "/" || location.pathname === "/home";
  const visiblePaths = ["/pokemon", "/item", "/berry"];
  const isHidden = !visiblePaths.includes(location.pathname);

  const [results, setResults] = useState<NamedAPIResource[]>([]);

  const { data } = useQuery({
    queryKey: [location.pathname],
    queryFn: () => namesListByCondition({ path: location.pathname }),
  });

  const clearResults = () => {
    if (isHidden) return;
    setResults([]);
    setInputValue("");
    navigate(location.pathname, {
      state: { ...location.state, searchData: [], searchInput: "" },
    });
    return;
  };

  useEffect(() => {
    clearResults();
  }, [location.pathname]);

  const handleSearchOnClick = (value: string) => {
    setInputValue(value);
    setSearchParams({ search: value });
  };

  useEffect(() => {
    if (searchResults) {
      const filterList = (data?.results ?? []).filter((p: NamedAPIResource) =>
        p.name.toLowerCase().includes(inputValue.toLowerCase()),
      );
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
        },
        {
          state: {
            ...location.state,
            searchData: filterList,
            searchInput: inputValue,
          },
        },
      );
    }
  }, [searchResults]);

  const showSuggestions = () => {
    const filterList = (data?.results ?? []).filter((p: NamedAPIResource) => {
      return p.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    // check the results not empty
    setResults(filterList.slice(0, 10));
  };

  useEffect(() => {
    // handle clear input
    if (inputValue == "") showSuggestions();
    // Handle search
    const timeout = setTimeout(() => {
      const filterList = (data?.results ?? []).filter(
        (p: NamedAPIResource) =>
          p.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          splitIdFromLink(p.url)
            .toLowerCase()
            .includes(inputValue.toLowerCase()),
      );
      if (inputValue !== "") setResults(filterList.slice(0, 10));
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 px-4 shadow-sm">
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
        <div className="mx-3 hidden items-center md:block">
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
            onFocusCallback={() => showSuggestions()}
            setFocus={setFocus}
            value={inputValue}
            setInputValue={setInputValue}
            isHidden={isHidden}
          />
          <div
            id="search-results"
            className={`${!isFocus && "hidden"} bg-base-100 absolute z-10 mt-1 w-full rounded-lg text-black capitalize shadow-lg dark:text-white`}
          >
            <ul className={`divide-yp-1 backdrop-brightness-140`}>
              {results.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSearchOnClick(item.name)}
                  className="cursor-pointer rounded-md p-2 capitalize transition hover:bg-red-700 active:bg-red-800"
                >
                  <span className="text-gray-400">
                    #{splitIdFromLink(item.url)}
                  </span>{" "}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          aria-label="clear searchbar"
          onClick={() => clearResults()}
          className={`btn btn-info ml-2 ${isHidden && "hidden"} `}
        >
          <X />
        </button>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
