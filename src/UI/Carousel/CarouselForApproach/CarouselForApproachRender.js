import React, { useContext, useEffect, useState } from 'react';
import classes from './CarouselForApproach.module.css';
import {Slider, Slide, CarouselContext, WithStore } from 'pure-react-carousel';


const CarouselForApproachRender = props => {
    const windowWidth = window.innerWidth;

    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
    props.changeCurrentSlide(currentSlide);
    useEffect(() => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);
    
    const cls = [classes.slideItem];

    return (
        <Slider style={{'height': '420px'}}>
            {
                Object.keys(props.slides).map((slideItem, index) => {
                    const slide = props.slides[slideItem];
                    if (index === currentSlide) {
                        cls.push(classes.slideItemActive)
                    } else {
                        cls.splice(1, 1)
                    }
                    
                    return (
                        <Slide
                            key={index}
                            index={index}
                        >
                            <div
                                className={cls.join(' ')}
                            >
                                {
                                    windowWidth <= 425
                                    ? <div
                                        className={classes.currentSlideMarker}
                                        ><p>{index+1}</p></div>
                                    : currentSlide === index ?
                                        <div
                                            className={classes.currentSlideMarker}
                                        ><i>{index+1}</i></div>
                                    :
                                        <i
                                            className={classes.marker}
                                        />
                                }

                                <h2>{slide.slideHeading}</h2>

                                <p>{slide.slideContent}</p>
                            </div>
                        </Slide>
                    )
                })
            }
        </Slider>
    )
}


export default WithStore(CarouselForApproachRender, state => ({
    currentSlide: state.currentSlide,
    })
) 