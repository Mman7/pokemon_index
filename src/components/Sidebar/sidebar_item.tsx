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
    ? "font-medium  text-white backdrop-brightness-175"
    : "text-gray-500 hover:backdrop-brightness-50";

  return (
    <li key={title}>
      <button
        onClick={callback}
        className={`"text-gray-500 hover:backdrop-brightness-50" block w-full rounded-lg px-4 py-2 text-left text-base/8 ${selectedStlyle}`}
      >
        {title}
      </button>
    </li>
  );
}
