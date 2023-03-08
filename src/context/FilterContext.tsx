import { createContext } from "react";
import { useReducer } from "react";
import { IFilter } from "../interface/IFilter";
import { FilterReducer } from "../reducers/FilterReducer";

export interface IFilterContext {
  filterState: IFilter;
  filterDispatch: React.Dispatch<any>;
}

export const FilterContext = createContext<IFilterContext>({
  filterState: { bcapName: "", rangeMax: 0 },
  filterDispatch: () => {},
});

export const FilterContextProvider: React.FC = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(FilterReducer, {
    bcapName: "",
    rangeMax: 0,
  });

  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
