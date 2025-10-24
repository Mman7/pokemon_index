import Searchbar from "./search_bar";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    if (inputValue !== "") {
      navigate("/pokemon");
    }
  }, [inputValue]);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      alert("Input field cannot be empty!");
    } else {
      alert(`Submitted: ${inputValue}`);
      // Proceed with form submission or other logic
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
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
          <img className="w-60" src={logo} alt="Pokemon Index" />
        </div>
      </div>
      <div className="navbar-center">
        <div className="relative z-10 w-64">
          <Searchbar value={inputValue} handleChange={handleChange} />
          <ul
            id="options"
            className={`${inputValue == "" && "hidden"} absolute w-full overflow-y-auto rounded border border-gray-300 bg-white shadow-lg`}
          >
            <li className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100">
              Apple
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
