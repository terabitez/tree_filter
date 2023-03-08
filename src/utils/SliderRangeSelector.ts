import { IBCAPItem } from "../interface/IBCAPItem";
import { ISliderRange } from "../interface/ISliderRange";

export const getSliderRange = (data: IBCAPItem[]): ISliderRange => {
  let range: ISliderRange = { min: 0, max: 0, median: 0 };

  let _min: number = data[0].spend;
  let _max = data[0].spend;

  for (let i = 1; i < data.length; i++) {
    const val = data[i].spend;
    if (val < _min) {
      _min = val;
    }
    if (val > _max) {
      _max = val;
    }
  }

  range.min = _min;
  range.max = _max;

  const _values = _max - _min + 1;
  const mid = Math.floor(_values / 2);

  range.median = mid;
  return range;
};
