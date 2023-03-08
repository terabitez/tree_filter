import React from "react";

import BusinessCapabilityContextProvider from "./context/BusinessCapabilityContext";
import FilterContextProvider from "./context/FilterContext";
import Main from "./pages/Main";

const App: React.FC = () => {
  return (
    <BusinessCapabilityContextProvider>
      <FilterContextProvider>
        <Main />
      </FilterContextProvider>
    </BusinessCapabilityContextProvider>
  );
};

export default App;
