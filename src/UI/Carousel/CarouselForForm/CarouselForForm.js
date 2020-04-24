import React from "react";
import classes from './CarouselForForm.module.css'
import Slider from 'react-slick'

export default class CarouselForForm extends React.Component {

    state = {
        slides:{
            0: {
                slideContent: 'bonjour',
                className: 'slideItemActive'
            },
            1: {
                slideContent: 'guten tag',
                className: 'slideItem'
            },
            2: {
                slideContent: 'hello',
                className: 'slideItem'
            },
            3: {
                slideContent: 'ciao',
                className: 'slideItem'
            },
            4: {
                slideContent: '你好',
                className: 'slideItem'
            },
            5: {
                slideContent: 'привет',
                className: 'slideItem'
            },
        },
    };
    
    beforeChange(i, n) {
        const {slides} = this.state;
        slides[i].className = 'slideItem';

        slides[n].className = 'slideItemActive';
        this.setState({ slides })
    }

    render() {
        const settings = {
            className: classes.carouselContent,
            dots: false,
            infinite: true,
            centerMode: true,
            adaptHeight:false,
            speed: 1000,
            autoplaySpeed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            vertical: true,
            beforeChange: (i, n) => this.beforeChange(i, n),
            autoplay: true,
            swipe: false,
            pauseOnHover: false
        };

        const { slides } = this.state;

        return (
            <div className={classes.CarouselForForm}>
                <div>
                    <h2>Say</h2>
                </div>
                <Slider
                    {...settings}
                >
                    {
                        Object.keys(slides).map((slideItem, index) => {
                            const slide = slides[slideItem];
                            return (
                                <div className={classes[slide.className]} key={index}>
                                    <h2>{slide.slideContent}</h2>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        )
    }
};