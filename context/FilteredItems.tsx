import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Position } from "../pages";

type FilteredItems = {
  filteredItems: Position[];
  setFilteredItems: Dispatch<SetStateAction<Position[]>>;
};

const FilteredItemsContext = createContext<FilteredItems>({} as FilteredItems);

export const FilteredItemsProvider: FC = ({ children }) => {
  const [filteredItems, setFilteredItems] = useState<Position[]>([]);

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
