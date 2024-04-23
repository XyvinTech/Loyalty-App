import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const SelectContainer = styled.div`
  position: relative;
  width: 100%; /* Adjust width as needed */
`;
const StyledSelectField = ({ options, value, placeholder,
  onChange, onInputChange,
  isMulti = false, isSearchable = true, isLoading = false,
  height, ...props }) => {

  const [valueOptions, setValueOption] = useState({})

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderRadius: "4px",
      boxShadow: state.isFocused ? "0 0 0 1px #4746eb" : "none",
      cursor: "pointer",
      height: height ? height : '40px',

    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none", // Remove the separator
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#8083f5" : "#fff",
      color: state.isFocused ? "#fff" : "#555",
      cursor: "pointer",
      // fontSize:'12px'
      // Add a :active pseudo-class for selected option
      ":active": {
        backgroundColor: "#cac9fa",
      },
    }),
    menu: (provided) => ({
      ...provided,
      // backgroundColor: "var(--inner, #39383D)",
      color: "#000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#555", // Set the text color for the selected value
    })
  };

  var selectedIndex = -1;
  var multiSelected = [];
  useEffect(() => {
    selectedIndex = -1;
    multiSelected = [];
    if (options) {
      for (var i = 0; i < options.length && value; i++) {
        if (isMulti) {
          for (let index = 0; index < value.length; index++) {
            if (options[i].value === value[index] || options[i].label === value[index] || options[i].value === value[index].value) {
              multiSelected.push(options[i])
            }
          }
        } else {
          if (options[i].value === value || options[i].label === value) {
            selectedIndex = i;
            break;
          }
        }
      }
    }
    if (isMulti) {
      setValueOption({ value: options && (isMulti && multiSelected) })
      // valueOptions.defaultValue = options && (isMulti && multiSelected)
    }
    else {
      setValueOption({ value: options && (!isMulti && options[selectedIndex]) })
      // valueOptions.value = options && (!isMulti && options[selectedIndex])
    }
    if(!value){
      setValueOption({ value: "" })
    }
  }, [value,options])

  return (
    <SelectContainer>
      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        styles={customStyles}
        // theme={customTheme}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isLoading={isLoading}
        menuPlacement="auto"
        {...props}
        {...valueOptions}
      />
    </SelectContainer>
  );
};

export default StyledSelectField;
