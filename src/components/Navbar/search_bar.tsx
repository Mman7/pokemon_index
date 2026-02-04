import { type JSX } from "react";

interface SearchbarProps {
  isHidden: boolean;
  value: string;
  setInputValue: any;
  setFocus: Function;
  onFocusCallback: Function;
}

export default function Searchbar({
  isHidden,
  value,
  setInputValue,
  setFocus,
  onFocusCallback,
}: SearchbarProps): JSX.Element {
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onFocus = () => {
    onFocusCallback();
    setFocus(true);
  };
  const onBlur = () => {
    setTimeout(() => setFocus(false), 100);
  };

  return (
    <label
      className={`input ${isHidden && "hidden"} transition-all duration-100`}
    >
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
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
