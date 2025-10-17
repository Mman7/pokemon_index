import { useState } from "react";
import SidebarItem from "./sidebar_item";

export default function Sidebar() {
  const [select, setSelect] = useState("Dashboard");
  const items_list1 = ["Pokemon", "Move", "Ability"];
  const items_list2 = ["Location"];
  const items_list3 = ["Item", "Berry", "Game"];

  return (
    <div>
      {items_list1.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === item}
        />
      ))}
      <div className="border-t border-gray-700" />
      {items_list2.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === item}
        />
      ))}
      <div className="border-t border-gray-700" />
      {items_list3.map((item) => (
        <SidebarItem
          title={item}
          key={item}
          callback={() => setSelect(item)}
          isSelected={select === item}
        />
      ))}
    </div>
  );
}
