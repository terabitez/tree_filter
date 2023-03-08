import { ActionType } from "../constants/ActionType";
import { IFilter } from "../interface/IFilter";

interface FIlterAction {
  type: ActionType;
  payload: IFilter;
}

export const FilterReducer = (
  state: IFilter,
  action: FIlterAction
): IFilter => {
  switch (action.type) {
    case ActionType.SET_FILTER:
      return {
        bcapName: action.payload.bcapName,
        rangeMax: action.payload.rangeMax,
      };
    case ActionType.SET_RANGE_MAX:
      return { ...state, rangeMax: action.payload.rangeMax };
    case ActionType.SET_SELECTED_BCAP:
      return { ...state, bcapName: action.payload.bcapName };

    default:
      return state;
  }
};
