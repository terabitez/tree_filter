import React, { useState, useEffect, useContext } from "react";

import CardsContainerView from "../components/CardsContainerView";
import SliderView from "../components/SliderView";
import TreeView from "../components/TreeView";
import { ActionType } from "../constants/ActionType";
import { BusinessCapabilityContext } from "../context/BusinessCapabilityContext";
import { FilterContext } from "../context/FilterContext";
import { ISliderRange } from "../interface/ISliderRange";
import { ITreeNode } from "../interface/ITreeNode";
import { fetchData } from "../services/DataServices";
import "../styles/App.css";
import { parseBCAP } from "../utils/BCAPTreeParser";
import { getSliderRange } from "../utils/SliderRangeSelector";

const Main: React.FC = () => {
  const [dataTree, setDataTree] = useState<ITreeNode[]>([]);
  const [rangeValue, setSliderRange] = useState<ISliderRange>({
    min: 0,
    max: 0,
    median: 0,
  });

  const { dispatch } = useContext(BusinessCapabilityContext);
  const { filterState, filterDispatch } = useContext(FilterContext);

  async function loadBCAP() {
    const rawdata = await fetchData();

    const parsedData: ITreeNode[] = (await parseBCAP(rawdata)) as ITreeNode[];
    const sliderRange: ISliderRange = (await getSliderRange(
      rawdata
    )) as ISliderRange;

    await setDataTree(parsedData);
    await setSliderRange(sliderRange);

    dispatch({ type: ActionType.SET_DATA, payload: rawdata });

    const initBcapName = rawdata[0].BCAP1;

    filterDispatch({
      type: ActionType.SET_FILTER,
      payload: { bcapName: initBcapName, rangeMax: sliderRange.median },
    });
  }

  useEffect(() => {
    loadBCAP();
  }, []);

  function handleSliderChange(newValue: number) {
    filterDispatch({
      type: ActionType.SET_RANGE_MAX,
      payload: { bcapName: filterState.bcapName, rangeMax: newValue },
    });
  }

  return (
    <div>
      <div className="container">
        <div className="left-column">
          <h4> Navigation</h4>
          <div className="row-1">
            <TreeView data={dataTree} />
          </div>
          <h4> Filter</h4>
          <div className="row-2">

          <p className="slidertitle"> Spending</p>
            <SliderView
              min={rangeValue.min}
              max={rangeValue.max}
              step={1}
              value={rangeValue.median}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div className="right-column">
          <CardsContainerView />
        </div>
      </div>
    </div>
  );
};

export default Main;
