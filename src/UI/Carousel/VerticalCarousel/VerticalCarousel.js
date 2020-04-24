import React from "react";
import classes from './VerticalCarousel.module.css'
import Slider from 'react-slick'

export default class VerticalCarousel extends React.Component {

    state = {
        slides:{
            0: {
                slideContent: 'Web Sites',
                className: 'slideItemActive'
            },
            1: {
                slideContent: 'Mobile Apps',
                className: 'slideItem'
            },
            2: {
                slideContent: 'Design',
                className: 'slideItem'
            },
            3: {
                slideContent: 'Games',
                className: 'slideItem'
            },
            4: {
                slideContent: 'Marketplace',
                className: 'slideItem'
            },
            5: {
                slideContent: 'Social Network',
                className: 'slideItem'
            },
            6: {
                slideContent: 'Uber clone',
                className: 'slideItem'
            },
            7: {
                slideContent: 'Hyper-casual Game',
                className: 'slideItem'
            },
            8: {
                slideContent: 'Ridesharing Service',
                className: 'slideItem'
            },
            9: {
                slideContent: 'Delivery App',
                className: 'slideItem'
            },
            10: {
                slideContent: 'Online Shop',
                className: 'slideItem'
            },
            11: {
                slideContent: 'Racing Game',
                className: 'slideItem'
            },
        },
    };

    beforeChange(i, n) {
        const {slides} = this.state;
        const length = Object.keys(slides).length;
        if (n !== 0 && n !== 1) {
            slides[n-2].className = 'faded';
        } else if (n === 0) {
            slides[length-2].className = 'faded';
        } else if (n === 1) {
            slides[length-1].className = 'faded';
        }
        
        if (i !== length-1 && i !== length-2) {
            slides[i+2].className = 'slideItem';
        } else if (i === length-2) {
            slides[0].className = 'slideItem';
        } else if (i === length-1) {
            slides[1].className = 'slideItem';
        }


        slides[i].className = 'slideItem';

        slides[n].className = 'slideItemActive';

        this.setState({ slides })
    }
    pauseSlides = () => {
        this.slider.slickPause()
    };
    playSlides = () => {
        this.slider.slickPlay()
    }

    carouselStartStopOnScroll = () => {
        const windowHeight = window.innerHeight;
        const carouselContainerFromTop = document.getElementById('carouselContainer').getBoundingClientRect().top;
        const carouselContainerFromBottom = document.getElementById('carouselContainer').getBoundingClientRect().bottom;
        if (carouselContainerFromTop > 0) {
            if(carouselContainerFromTop - windowHeight < 0) {
                this.playSlides()
            } else {
                this.pauseSlides()
            }
        } else {
            if (carouselContainerFromBottom - windowHeight > 0) {
                this.playSlides()
            } else {
                this.pauseSlides()
            }
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.carouselStartStopOnScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.carouselStartStopOnScroll);
    }

    render() {
        const settings = {
            className: classes.carouselContent,
            swipe: false,
            verticalSwiping: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            draggable: false,
            touchMove: false,
            accessibility: false,
            dots: false,
            infinite: true,
            centerMode: true,
            adaptHeight:false,
            speed: 1500,
            autoplaySpeed: 1500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            vertical: true,
            beforeChange: (i, n) => this.beforeChange(i, n),
            autoplay: true,
        };

        const { slides } = this.state;

        return (
            <div className={classes.VerticalCarousel} id='carouselContainer'>
                <Slider
                    {...settings}
                    ref={c => (this.slider = c)}
                >
                    {
                        Object.keys(slides).map((slideItem, index) => {
                            const slide = slides[slideItem];
                            return (
                                <div className={classes[slide.className]} key={index}>
                                {
                                    slide.slideContent.length > 14 
                                    ? <h2 id={classes.bigWord}>{slide.slideContent}</h2>
                                    : <h2>{slide.slideContent}</h2>
                                }
                                    
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        )
    }
};