import Searchbar from "./search_bar";
import logo from "../../assets/logo.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isPokemonPage = location.pathname === "/pokemon";

  useLayoutEffect(() => {
    if (!isPokemonPage) return;
    const timeout = setTimeout(() => {
      navigate("/pokemon", {
        state: { searchData: inputValue },
      });
    }, 600);
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
        <Searchbar
          value={inputValue}
          setInputValue={setInputValue}
          isHidden={location.pathname === "/"}
        />
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
