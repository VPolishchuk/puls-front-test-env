import React from 'react';
import classes from './CarouselForTestimonials.module.css'
import Slider from 'react-slick'
import FeedbackCard from '../../../components/FeedbackCard/FeedbackCard'

const CarouselForTestimonials = (props) => {
    const slidesLength = Object.keys(props.testimonials).length
    const appendDots = (dots) => {
        return (
            <div>
                <ul>{dots}</ul>
            </div>
        )
    }
    
    const windowWidth = window.innerWidth;
    let draggable = true;
    
    if (windowWidth >= 1140) {
        draggable = false;
    }

    const settings = {
        autoplay: false,
        dots: true,
        infinite: true,
        speed: props.speed,
        slidesToShow: props.slidesToShow,
        pauseOnHover: true,
        arrows: false,
        draggable: draggable,
        beforeChange: (i, n) => props.beforeChange(i, n),
        appendDots: dots => appendDots(dots)
    }

    return (
        
        <div className={classes.CarouselForTestimonials} id='CarouselForTestimonialsContainer'
                                onTouchMove={props.changeSpeed}>
            <Slider
                {...settings}
                ref={props.refs}
            >
                {
                    Object.keys(props.testimonials).map((feedbackCard, index) => {
                        const card = props.testimonials[feedbackCard];
                        return (
                            <FeedbackCard
                                key={index}
                                upwork={card.upwork}
                                avatar={card.avatar}
                                feedbackDate={card.commentDate}
                                heading={card.commentHeading}
                                feedbackText={card.commentText}
                                rating={card.rating}
                                onTouchStart={props.pauseSlides}
                                onTouchEnd={props.playSlides}
                            />
                        )
                    })
                }
            </Slider>
            <div className={classes.counter}>
                <div className={classes.prevBtn} onClick={props.previousSlide} style={{padding: '8px'}}>
                    <span className={classes.angleLeft}></span>
                </div>
                <div className={classes.counterContainer}>
                    <span
                        className={classes.counterActive}
                    >{props.currentSlide+1}</span>
                    <span>{'/' + slidesLength }</span>
                </div>
                <div className={classes.nextBtn} onClick={props.nextSlide} style={{padding: '8px'}}>
                    <span className={classes.angleRight}></span>
                </div>
            </div>
        </div>
    )
}

export default CarouselForTestimonials;