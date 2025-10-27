import { useEffect, useState } from "react";
import SidebarItem from "./sidebar_item";
import { useLocation } from "react-router";

export default function Sidebar() {
  const [select, setSelect] = useState<string | null>("");
  let location = useLocation();
  useEffect(() => {
    setSelect(location.pathname);
  }, [location]);

  const items_list1 = ["Pokemon", "Move", "Ability"];
  const items_list2 = ["Location"];
  const items_list3 = ["Item", "Berry", "Game"];

  const dividedLine = (
    <div className="mx-3 my-1.5 flex items-center border-t border-gray-700" />
  );
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-70 p-4 sm:w-80">
      <SidebarItem
        title={"Home"}
        callback={() => setSelect(null)}
        isSelected={select === "/"}
      />
      {items_list1.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === `/${item.toLowerCase()}`}
        />
      ))}
      {dividedLine}
      {items_list2.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === `/${item.toLowerCase()}`}
        />
      ))}
      {dividedLine}
      {items_list3.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === `/${item.toLowerCase()}`}
        />
      ))}
    </ul>
  );
}
