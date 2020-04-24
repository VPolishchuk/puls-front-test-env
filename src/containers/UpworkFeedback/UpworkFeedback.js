import React, { Component } from 'react';
import classes from './UpworkFeedback.module.css'
import CarouselForTestimonials from '../../UI/Carousel/CarouselForTestimonials/CarouselForTestimonials';
import app from "../../firebase-config";

const db = app.firestore();

export default class UpworkFeedback extends Component {
    state = {
        testimonials: {},
        currentSlide: 0,
        slidesToShow: 3,
        speed: 200
    }
    beforeChange = (i, n) => {        
        this.setState({
            currentSlide: n
        })
    }
    pauseSlides = () => {
        this.slider.slickPause()        
    };
    playSlides = () => {
        this.slider.slickPlay()
    }
    nextSlide = () => {
        this.slider.slickNext();
    }
    previousSlide = () => {
        this.slider.slickPrev();
    }
    ref = (c) => {
        this.slider = c
    }

    getTestimonialsData = async () => {
        try {
            const res = await db.collection('commentsList').get();            
            const data = res.docs.map(doc => ({...doc.data()}));
            this.setState({
                testimonials: data,
                currentSlide: res.docs.length - res.docs.length
            })
        } catch (err) {
            console.error(err);
        }
    }
    
    checkWindowWidth = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
            this.setState({
                slidesToShow: 1
            })
        } else if (windowWidth >= 768 && windowWidth < 1140) {
            this.setState({
                slidesToShow: 2
            })
        } else if (windowWidth >= 1140) {
            this.setState({
                slidesToShow: 3
            })
        }
    }

    componentDidMount() {
        this.getTestimonialsData();
        this.checkWindowWidth();
        window.addEventListener('resize', this.checkWindowWidth)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.checkWindowWidth);
    }

    render(){
        return(
            <div className={classes.UpworkFeedback}>
                <div className={classes.container}>
                    <h1>Testimonials</h1>
                    <CarouselForTestimonials
                        testimonials={this.state.testimonials}
                        currentSlide={this.state.currentSlide}
                        beforeChange={this.beforeChange}
                        afterChange={this.afterChange}
                        refs={(c) => this.ref(c)}
                        nextSlide={this.nextSlide}
                        previousSlide={this.previousSlide}
                        slidesToShow={this.state.slidesToShow}
                        playSlides={this.playSlides}
                        pauseSlides={this.pauseSlides}
                        changeSpeed={this.changeSpeed}
                        speed={this.state.speed}
                    />
                </div>                
            </div>
        )
    }
}