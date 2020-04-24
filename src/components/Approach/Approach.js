import React from "react";
import classes from './Approach.module.css';
import CarouselForApproach from "../../UI/Carousel/CarouselForApproach/CarouselForApproach";

export default class Approach extends React.Component {
    state = {
        slides: {
            0: {
                slideHeading: 'Negotiation',
                slideContent: 'At the negotiation stage, we define challenges your business wants to overcome and elicit your initial requirements for your digital product. Based on this information, we offer a technology solution that will meet your challenges and prepare a really rough estimate.'
            },
            1: {
                slideHeading: 'Planning',
                slideContent: 'During the planning stage, we gather and analyze your requirements so we can prepare a quality solution on time and within budget. We then carry out thorough research to define the technology stack and the product concept of a future app and to prepare a product specification, wireframes, and other project documents.'
            },
            2: {
                slideHeading: 'Design',
                slideContent: 'Based on the wireframes we got after the planning stage, we start preparing a product prototype that you actually can click on. We then design the UI of your future app. The UI of your app can be also complemented with strong branding, if necessary.'
            },
            3: {
                slideHeading: 'Development',
                slideContent: 'Since design and development are closely dependent on each other, these are usually performed simultaneously to speed up development. Development is accomplished in sprints, each lasting for two weeks. Working in sprints allows us to gradually demonstrate the results of development to you.'
            },
            4: {
                slideHeading: 'Testing',
                slideContent: 'We also perform iterative testing to generate working software early in the software lifecycle. We fix any bugs in the system before its actual release, which allows for delivering the most pleasant and smooth user experience for your customers.'
            },
            5: {
                slideHeading: 'Support',
                slideContent: 'We also provide post-release support services available for a period determined by you. Supporting and maintaining a product after launch makes it possible for you to constantly improve your product\'s quality to meet the needs of end users. Our development team can make any improvements to your product quickly without impacting its performance.'
            },
        },
        currentSlide: 0,
        draggable: false,
        mobileMarker: false,
        visibleSlides: 4,
        totalSlides: 9
    };

    changeCurrentSlide = (currentSlide) => {
        this.setState({currentSlide})
    }

    checkWindowWidth = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1140) {
            this.setState({
                draggable: false,
                visibleSlides: 4,
                totalSlides: 9
            })            
        } else if (windowWidth < 1140 && windowWidth >= 992) {
            this.setState({
                draggable: false,
                visibleSlides: 3,
                totalSlides: 8
            })
        } else if (windowWidth < 992 && windowWidth >= 768) {
            this.setState({
                draggable: true,
                visibleSlides: 2,
                totalSlides: 7
            })
        } else if (windowWidth < 767) {
            this.setState({
                draggable: true,
                visibleSlides: 1,
                totalSlides: 6
            });
        }
    }

    componentDidMount(){
        this.checkWindowWidth() 
        window.addEventListener('resize', this.checkWindowWidth)
    }

    render(){
        return (
            <div className={classes.Approach}>
                <h1>Our Approach</h1>
                <CarouselForApproach
                    slides={this.state.slides}
                    currentSlide={this.state.currentSlide}
                    changeCurrentSlide={this.changeCurrentSlide}
                    currentSlide={this.state.currentSlide}
                    totalSlides={this.state.totalSlides}
                    visibleSlides={this.state.visibleSlides}
                    draggable={this.state.draggable}
                />
            </div>
        )
    }    
};