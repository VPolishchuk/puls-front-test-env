import React from 'react';
import Select  from 'react-select';
import classes from './Select.module.css';
/////////////////////////////////////////////////////////////

export const SelectInputComponent = ({
    name,
    label,
    options,
    errors,
    selectedOption,
    handleChange
  }) => (
    <div className={classes.SelectWrap}>
        {
            label &&
            <label>{label}</label>
        }
        <Select
            options={options}
            value={selectedOption}
            onChange={(newOpt) => handleChange(name, newOpt)}
        />
    </div>
);

export const MultySelectInputComponent = ({
    name,
    label,
    touched,
    options,
    errors,
    labelDisplay,
    selectedOption,
    handleChange
  }) => (
    <div className={classes.SelectWrap}>
        {
            label &&
            <label>{label}</label>
        }
        <Select
            closeMenuOnSelect={false}
            value={selectedOption}
            onChange={(newOpt) => handleChange(name, newOpt)}
            options={options}
            isMulti
        />
    </div>
);

export default MultySelectInputComponent;