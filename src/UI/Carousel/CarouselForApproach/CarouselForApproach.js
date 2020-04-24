import React from 'react';
import CarouselForApproachRender from './CarouselForApproachRender'
import classes from './CarouselForApproach.module.css'
import './CarouselForApproach.css'
import { CarouselProvider, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const CarouselForApproach = props => {

        const slidesLength = Object.keys(props.slides).length;
       
        return (
            <div className={classes.CarouselForApproach} id='carouselForApproachContainer'>

                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={props.totalSlides}
                    visibleSlides={props.visibleSlides}
                    infinite={true}
                    isPlaying={false}
                    touchEnabled={props.draggable}
                    dragEnabled={props.draggable}
                >
                    <CarouselForApproachRender
                        slides={props.slides}
                        changeCurrentSlide={props.changeCurrentSlide}
                    />
                    
                    <div className={classes.counter}>
                        <ButtonBack>
                            <div className={classes.prevBtn} style={{padding: '8px'}}>
                                <span className={classes.angleLeft}></span>
                            </div>
                        </ButtonBack>
                        <div className={classes.counterContainer}>
                            <span
                                className={classes.counterActive}
                            >{props.currentSlide + 1}</span>
                            <span>{'/' + slidesLength }</span>
                        </div>
                        <ButtonNext>
                            <div  className={classes.nextBtn} style={{padding: '8px'}}>
                                <span className={classes.angleRight}></span>
                            </div>
                        </ButtonNext>                    
                    </div>
                </CarouselProvider>                
            </div>
        )
};

export default CarouselForApproach;