import React from "react";
import classes from './TechnologiesAndApproach.module.css'
import Technologies from "../../components/Technologies/Technologies";
import Approach from "../../components/Approach/Approach";

export default class TechnologiesAndApproach extends React.Component {
    render(){
        return (
            <div className={classes.TechnologiesAndApproach}>
                <Technologies/>
                <Approach/>
            </div>
        )
    }
}