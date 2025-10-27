import { type JSX } from "react";

interface SearchbarProps {
  isHidden: boolean;
  value: string;
  setInputValue: any;
  setFocus: Function;
}

export default function Searchbar({
  isHidden,
  value,
  setInputValue,
  setFocus,
}: SearchbarProps): JSX.Element {
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onFocus = () => setFocus(true);
  const onBlur = () => {
    setTimeout(() => setFocus(false));
  };

  return (
    <label className={`input ${isHidden && "hidden"}`}>
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        autoComplete="off"
        placeholder="Search ID with #"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
