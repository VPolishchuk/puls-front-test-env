import React from 'react';
import classes from './Checkbox.module.css'

/// //////////////////////////////////////////////////////////

export const Checkbox = ({
    name,
    label,
    handleBlur,
    handleChange,
    checked=false }) => {
    const cls = [classes.Checkbox];
    cls.push(classes.bounce);
    return (
        <div className={classes.CheckboxWrap}>
            {
                label && <span>{label}</span>
            }
            <label className={cls.join(' ')}>
                <input
                    type="checkbox"
                    checked={checked}
                    onBlur={handleBlur}
                    onChange={() => handleChange(name, !checked)}
                />
                <svg viewBox="0 0 21 21">
                    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
            </label>
        </div>     
    )
}

export default Checkbox;
