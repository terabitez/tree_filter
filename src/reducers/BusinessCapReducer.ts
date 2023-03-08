import { ActionType } from "../constants/ActionType";
import { IBCAPItem } from "../interface/IBCAPItem";

interface BCAPAction {
  type: ActionType;
  payload: IBCAPItem[];
}

export const businessCapabilityReducer = (
  state: IBCAPItem[],
  action: BCAPAction
): IBCAPItem[] => {

  switch (action.type) {
    case ActionType.SET_DATA:
      return action.payload;

    default:
      return state;
  }
  
};
