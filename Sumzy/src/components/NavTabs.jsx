import React from "react";

export default function NavTabs({ active, setActive }) {
  const tabs = ["Calculator", "Converter", "Finance", "Graph", "History"];

  return (
    <nav className="bg-white rounded-2xl shadow-sm px-4 py-3">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold shrink-0">
          Sumzy
        </h1>
        <div
          className="
            flex
            gap-2
            overflow-x-auto
            whitespace-nowrap
            scrollbar-hide
            flex-1
          "
        >
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`
                px-4 py-2
                rounded-full
                text-sm sm:text-base
                font-medium
                transition-all
                shrink-0
                ${
                  active === t
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
