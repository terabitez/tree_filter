import React, { useState, useEffect } from "react";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderView: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(value);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  }

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          style={{ flex: 1, margin: "0 10px" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{min}</span>
        <div style={{ flex: 1 }} />
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderView;
