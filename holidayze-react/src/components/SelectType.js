import Select from "react-select";
import React from "react";

const SelectType = ({ options, onChange }) => {
  return (
    <div>
      <Select defaultValue={options[0]} options={options} onChange={onChange} />
    </div>
  );
};

export default SelectType;
