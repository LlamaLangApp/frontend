import { useState, useEffect } from "react";

export type FilterFunction<T> = (item: T, searchText: string) => boolean;

interface UseFilteredItemsOptions<T> {
  allItems: Record<string | number, T>;
  filterFunction: FilterFunction<T>;
}

const useFilteredItems = <T,>({
  allItems,
  filterFunction,
}: UseFilteredItemsOptions<T>) => {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  const changeFilteredItems = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const filtered = Object.values(allItems).filter((item) =>
      filterFunction(item, searchText)
    );
    setFilteredItems(filtered);
  }, [allItems, searchText]);

  return {
    searchText,
    filteredItems,
    changeFilteredItems,
  };
};

export default useFilteredItems;
