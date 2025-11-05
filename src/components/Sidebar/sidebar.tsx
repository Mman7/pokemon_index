import { useEffect, useState } from "react";
import SidebarItem from "./sidebar_item";
import { useLocation } from "react-router";

export default function Sidebar() {
  const [select, setSelect] = useState<string | null>("");
  let location = useLocation();
  useEffect(() => {
    setSelect(location.pathname);
  }, [location]);

  const items_list1 = ["Pokemon", "Item", "Berry"];

  const dividedLine = (
    <div className="mx-3 my-1.5 flex items-center border-t border-gray-700" />
  );
  return (
    <ul className="menu bg-base-200 text-base-content top-16 h-[calc(100vh-4rem)] w-70 p-4 sm:w-80">
      <SidebarItem
        title={"Home"}
        callback={() => setSelect(null)}
        isSelected={select === "/" || select === "/home"}
      />
      {dividedLine}

      {items_list1.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === `/${item.toLowerCase()}`}
        />
      ))}
      <a
        className="mt-auto bg-blue-500 p-2 text-center text-white"
        target="_blank"
        href="https://github.com/Mman7"
      >
        By EricMan
      </a>
    </ul>
  );
}
