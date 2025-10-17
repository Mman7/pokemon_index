import Searchbar from "./search_bar";
import logo from "../../assets/logo.svg";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <label
          htmlFor="my-drawer-2"
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
          <img className="w-60" src={logo} alt="Pokemon Index" />
        </div>
      </div>
      <div className="navbar-center">
        <Searchbar />
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
