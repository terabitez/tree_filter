import React, { useContext, useEffect, useState } from "react";
import { BusinessCapabilityContext } from "../context/BusinessCapabilityContext";
import { FilterContext } from "../context/FilterContext";
import { IBCAPItem } from "../interface/IBCAPItem";
import ApplicationCard from "./ApplicationCardsView";

const CardsContainerView: React.FC = () => {
  const { bcapState } = useContext(BusinessCapabilityContext);
  const { filterState } = useContext(FilterContext);
  const [cards, setCards] = useState<IBCAPItem[]>([]);

  const filterCards = () => {
    let _cards: IBCAPItem[] = bcapState.filter((item) => {
      return (
        item["spend"] <= filterState.rangeMax &&
        (item.BCAP1 === filterState.bcapName ||
          item.BCAP2 === filterState.bcapName ||
          item.BCAP3 === filterState.bcapName)
      );
    });

    setCards(_cards);
  };

  useEffect(() => {
    filterCards();
  }, [filterState]);

  return (
    <div className="gridcontainer">
      {cards.map((card) => (
        <ApplicationCard key={card.id} name={card.name} spend={card.spend} />
      ))}
    </div>
  );
};

export default CardsContainerView;
