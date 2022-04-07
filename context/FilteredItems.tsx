import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FilteredItems = {
  filteredItems: any[];
  setFilteredItems: Dispatch<SetStateAction<any[]>>;
};

const FilteredItemsContext = createContext<FilteredItems>({} as FilteredItems);

export const FilteredItemsProvider: FC = ({ children }) => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  return (
    <FilteredItemsContext.Provider value={{ filteredItems, setFilteredItems }}>
      {children}
    </FilteredItemsContext.Provider>
  );
};

export const useFilteredItems = () => {
  const { filteredItems, setFilteredItems } = useContext(FilteredItemsContext);
  return { filteredItems, setFilteredItems };
};
