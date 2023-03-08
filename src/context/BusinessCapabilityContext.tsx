import { createContext } from "react";
import { businessCapabilityReducer } from "../reducers/BusinessCapReducer";
import { useReducer } from "react";
import { IBCAPItem } from "../interface/IBCAPItem";

export interface IBusinessCapabilityContext {
  bcapState: IBCAPItem[];
  dispatch: React.Dispatch<any>;
}

export const BusinessCapabilityContext =
  createContext<IBusinessCapabilityContext>({
    bcapState: [],
    dispatch: () => {},
  });

export const BusinessCapabilityContextProvider: React.FC = ({ children }) => {
  const [bcapState, dispatch] = useReducer(businessCapabilityReducer, []);

  return (
    <BusinessCapabilityContext.Provider value={{ bcapState, dispatch }}>
      {children}
    </BusinessCapabilityContext.Provider>
  );
};

export default BusinessCapabilityContextProvider;
