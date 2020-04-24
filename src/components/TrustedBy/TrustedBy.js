import React from "react";
import classes from './TrustedBy.module.css'
import CarouselForTrustedBy from "../../UI/Carousel/CarouselForTrustedBy/CarouselForTrustedBy";

const TrustedBy = () => {
    return (
        <div className={classes.TrustedBy}>
            <h1>We Are Trusted By</h1>
            <div className={classes.content}>
                <CarouselForTrustedBy/>
            </div>
        </div>
    )
};

export default TrustedBy;