import React from "react";
import classes from './CarouselForTrustedBy.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AntsyLabs from '../../../style/Images/Icons/TrustedByIcons/AntsyLabs.svg';
import DynamoMoscow from '../../../style/Images/Icons/TrustedByIcons/DynamoMoscow.svg'
import GetGuide from '../../../style/Images/Icons/TrustedByIcons/GetGuide.svg'
import HomaGames from '../../../style/Images/Icons/TrustedByIcons/HomaGames.svg'
import Holens from '../../../style/Images/Icons/TrustedByIcons/Holens.svg'
import OnlyFans from '../../../style/Images/Icons/TrustedByIcons/OnlyFans.svg'
import PupilHD from '../../../style/Images/Icons/TrustedByIcons/PupilHd.svg'
import RedCros from '../../../style/Images/Icons/TrustedByIcons/RedCross.svg'
import VTB from '../../../style/Images/Icons/TrustedByIcons/VTB.svg'
import WesternDigital from '../../../style/Images/Icons/TrustedByIcons/WesternDigital.svg'
import Vonder from '../../../style/Images/Icons/TrustedByIcons/Vonder.svg'
import Beacon from '../../../style/Images/Icons/TrustedByIcons/Beacon.svg'
import Single from '../../../style/Images/Icons/TrustedByIcons/Single.svg'
import Ramsbury from '../../../style/Images/Icons/TrustedByIcons/Ramsbury.svg'
import RigExpert from '../../../style/Images/Icons/TrustedByIcons/RigExpert.svg'

export default class CarouselForTrustedBy extends React.Component {
    state = {
        slides: {
            0: GetGuide,
            1: PupilHD,
            2: OnlyFans,
            3: HomaGames,
            4: AntsyLabs,
            5: VTB,
            6: RedCros,
            7: Holens,
            8: DynamoMoscow,
            9: WesternDigital,
            10: Vonder,
            11: Beacon,
            12: Single,
            13: Ramsbury,
            14: RigExpert
        },
        currentSlide: 0,
        slidesPerRow: 5,
        speed: 200
    };

    appendDots(dots){
        return (
            <div>
                <ul>{dots}</ul>
            </div>
        )
    }

    beforeChange(i, n) {
        this.setState({
            currentSlide: n
        })
    }

    nextSlide = () => {
        this.slider.slickNext();
    }
    previousSlide = () => {
        this.slider.slickPrev();
    }
    pauseSlides = () => {
        this.slider.slickPause()
    };
    playSlides = () => {
        this.slider.slickPlay()
    }

    changeSpeed = () => {
        this.setState({
            speed: 200
        })
    }

    checkWindowWidth = () => {
        const windowWidth = window.innerWidth;
            if (windowWidth < 768) {
                this.setState({
                    slidesPerRow: 2
                }) 
            } else if (windowWidth >= 767 && windowWidth < 992) {
                this.setState({
                    slidesPerRow: 3
                })        
            } else if (windowWidth >= 992 && windowWidth < 1140) {
                this.setState({
                    slidesPerRow: 4
                })
            } else if (windowWidth >= 1140) {
                this.setState({
                    slidesPerRow: 5,
                })
            }
    }

    componentDidMount() {
        this.checkWindowWidth()
        window.addEventListener('resize', this.checkWindowWidth)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.carouselStartStopOnScroll);
        window.removeEventListener('resize', this.checkWindowWidth)
    }

    render() {
        const {slidesPerRow} = this.state
        
        const settings = {
            autoplay: false,
            arrows: false,
            pauseOnHover: true,
            infinite: true,
            slidesToShow: 1,
            speed: this.state.speed,
            rows: 2,
            slidesPerRow: slidesPerRow,
            dots: true,
            appendDots: dots => this.appendDots(dots),
            beforeChange: (i, n) => this.beforeChange(i, n)
        };
        const { slides, currentSlide } = this.state;
        const slidesLength = Object.keys(slides).length/(slidesPerRow*2);

        return (
            <div className={classes.CarouselForTrustedBy} id='carouselForTrustedByContainer'>
                <Slider
                    {...settings}
                    ref={t => (this.slider = t)}
                >
                    {
                        Object.keys(slides).map((slideItem, index) => {
                            const slide = slides[slideItem];
                            return (
                                <div 
                                    key={index} 
                                    className={classes.slideItem}
                                    onTouchStart={this.pauseSlides}
                                    onTouchEnd={this.playSlides}
                                    onTouchMove={this.changeSpeed}
                                >
                                    <img src={slide} alt='company logo'></img>
                                </div>
                            )
                        })
                    }
                </Slider>

                <div className={classes.counter}>
                    <div className={classes.prevBtn} onClick={this.previousSlide} style={{padding: '8px'}}>
                        <span className={classes.angleLeft}></span>
                    </div>
                    <div className={classes.counterContainer}>
                        <span
                            className={classes.counterActive}
                        >{currentSlide+1}</span>
                        <span>{'/' + Math.ceil(slidesLength) }</span>
                    </div>
                    <div className={classes.nextBtn} onClick={this.nextSlide} style={{padding: '8px'}}>
                        <span className={classes.angleRight}></span>
                    </div>
                </div>
            </div>
        )
    }
}
