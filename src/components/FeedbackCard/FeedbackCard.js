import React from 'react';
import classes from './FeedbackCard.module.css'
import upworkLogo from '../../style/Images/UpworkLogo/UpworkLogo.svg'
import starFull from '../../style/Images/Icons/StarRating/StarFull.svg'
import star from '../../style/Images/Icons/StarRating/Star.svg'

const renderRating = (rating) => {
    let stars = []
    for (let i=0; i<rating; i++){
        stars.push(<img src={starFull} alt='rating' key={i} />)
    }
    if (rating < 5) {
        const difference = 5 - rating;
        for (let j=0; j<difference; j++) {
            stars.push(<img src={star} alt='rating' key={j+'star'} />)
        }
    }
    return (
        <div className={classes.rating}>
            {stars}
        </div>
    )
}

const FeedbackCard = (props) => {
    if (props.upwork) {
        return (
            <div className={classes.FeedbackCard}>
                <div className={classes.feedbackCardContainer}>
                    <div className={classes.feedbackCardTopContainer}>
                        <div className={classes.feedbackCardTop}>
                            <div className={classes.logoFeedbackDate}>
                                <div className={classes.upworkLogo}>
                                    <img src={upworkLogo} alt='upwork logo'/>
                                </div>
                                <div className={classes.feedbackDate}>
                                    <p>
                                        {props.feedbackDate}
                                    </p>
                                </div>
                            </div>
                            <div className={classes.feedbackHeading}>
                                <h3>
                                    {props.heading}
                                </h3>
                            </div>                        
                        </div>
                    </div>                
                    <div className={classes.feedbackText}>
                        <p>
                            {props.feedbackText}
                        </p>
                    </div>
                </div>            
            </div>
        )
    } else {
        return (
            <div className={classes.FeedbackCard}>
                <div className={classes.feedbackCardContainer}>
                    <div className={classes.feedbackCardCommentTopContainer}>
                        <div className={classes.feedbackCardCommentTop}>
                            <div className={classes.logoName}>
                                <div className={classes.logoFeedbackDate}>
                                    <div className={classes.upworkLogo}>
                                        <img src={props.avatar} alt='upwork logo'/>
                                    </div>
                                </div>
                                <div className={classes.feedbackHeading}>
                                    <h3>
                                        {props.heading}
                                    </h3>
                                </div>
                            </div>
                            <div className={classes.feedbackDateRating}>
                                <div className={classes.feedbackDateRatingContainer}>
                                    {
                                        renderRating(props.rating)
                                    }                                    
                                    <div className={classes.feedbackDate}>
                                        <p>
                                            {props.feedbackDate}
                                        </p>
                                    </div>
                                </div>                                
                            </div>                            
                        </div>
                    </div>                
                    <div className={classes.feedbackText}>
                        <p>
                            {props.feedbackText}
                        </p>
                    </div>
                </div>            
            </div>
        )
    }
}
export default FeedbackCard;