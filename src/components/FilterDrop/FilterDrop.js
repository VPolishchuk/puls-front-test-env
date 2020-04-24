import React from 'react'
import classes from './FilterDrop.module.css'

export const FilterDrop = ({
    open,
    setOpen
}) => {
    const cls = open ? classes.angleUp : classes.angleDown;
    return (
        <div
            className={classes.FilterDrop}
            onClick={() => setOpen()}
        >
            <span>Filters</span>
            <div className={cls} />
        </div>
    )
};