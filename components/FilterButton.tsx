import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { FilterIcon } from "@heroicons/react/solid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFilteredItems } from "../context/FilteredItems";
import { Position } from "../pages";

interface FiltersProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
}

interface FilterButtonProps {
  title: string;
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
}

const FilterButton = ({ title, items, setItems }: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-1000 text-white rounded px-4 py-2 flex gap-2 items-center"
      >
        Filter{" "}
        <span>
          <FilterIcon className="w-4 h-4" />
        </span>
      </button>
      <Filters
        items={items}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        setItems={setItems}
      />
    </>
  );
};

const Filters = ({
  isOpen,
  setIsOpen,
  title,
  setItems,
  items,
}: FiltersProps) => {
  const { filteredItems } = useFilteredItems();

  const handleCheckbox = (e: any) => {
    if (!e.target.checked) {
      setItems((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setItems((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        {/* TODO: Filters Checkbox */}
        <div className="relative bg-white rounded min-w-[40vw] mx-auto p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-bold text-xl">{title}</Dialog.Title>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-[#1774D1]/40 p-2 rounded-full"
            >
              <XIcon className="w-5 h-5 text-[#1774D1]" />
            </button>
          </div>
          <hr />
          <div>
            {filteredItems?.map((item) => (
              <div key={item.position_id}>
                <label className="inline-flex items-center space-x-4">
                  <input
                    className="w-6 h-6 mr-4 border-2 text-yellowwallow focus:ring-opacity-50 focus:ring-yellowwallow border-gray-400 rounded-full"
                    type="checkbox"
                    id={`c-${item}`}
                    value={item.position}
                    name={item.position}
                    onChange={handleCheckbox}
                    checked={items.includes(item.position)}
                  />
                  {item.position}
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#1774D1] text-white rounded px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default FilterButton;
