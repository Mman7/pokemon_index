import { Link } from "react-router";

interface SidebarItemProps {
  title: string;
  isSelected: boolean;
  callback: VoidFunction;
}

export default function SidebarItem({
  title,
  callback,
  isSelected,
}: SidebarItemProps) {
  const selectedStlyle = isSelected
    ? "font-medium text-white bg-red-600 bg-red-700 "
    : "text-black hover:backdrop-brightness-150 dark:text-white ";

  return (
    <Link to={`/${title.toLocaleLowerCase()}`}>
      <li key={title}>
        <button
          onClick={callback}
          className={`block w-full px-4 py-2 text-left text-base/8 duration-200 ${selectedStlyle}`}
        >
          {title}
        </button>
      </li>
    </Link>
  );
}
