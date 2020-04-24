import React from "react";
import classes from './Achievement.module.css'
import Star from "../../style/Images/Icons/Achievement/Star";
import ScrollAnimation from 'react-animate-on-scroll'
import "animate.css/animate.min.css";


export default class Achievement extends React.Component {

    state = {
        achievement: {
            clients: {
                name: 'Satisfied clients',
                count: 100,
                current: 0
            },
            projects: {
                name: 'Successful projects',
                count: 150,
                current: 0
            },
            specialists: {
                name: 'Professional specialists',
                count: 50,
                current: 0
            },
            hours: {
                name: 'Working hours',
                count: 50,
                current: 0,
                hours: true
            },
            topRated: {
                name: 'Top rated Upwork agency',
                star: true
            }
        }
    };

    animateValue(start, end, duration, ach) {

        const achievement = {...this.state.achievement};

        const achievementItem = achievement[ach];

        let range = end - start;
        let current = start;
        let increment = end > start? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            if (current !== end) {
                current += increment;
                achievementItem.current = current;
                return this.setState({achievement})
            } else {
                clearInterval(timer);
            }
        }, stepTime);
    };

    renderAchievement(){
        const {achievement} = this.state;
        const cls = [classes.starTopRated];

        if (achievement.clients.current !== 0){

            cls.push(classes.starTopRatedAnimate)
        }

        return Object.keys(achievement).map((ach, index) => {
            const achievementItem = achievement[ach];

            return (
                <ScrollAnimation
                    animateIn='flipInX'
                    animatePreScroll={true}
                    key={index}
                    animateOnce={true}
                    afterAnimatedIn={() => {this.animateValue(0, achievementItem.count, 500, ach)}}
                >
                    <div>
                        {
                            achievementItem.star
                            ? (
                                <div>
                                    <div className={cls.join(' ')}>
                                        <ScrollAnimation
                                            animateIn='flipInX'
                                            animateOnce={true}
                                        >
                                            <i>
                                                <Star/>
                                            </i>
                                        </ScrollAnimation>

                                    </div>
                                    <h4>
                                        {achievementItem.name}
                                    </h4>
                                </div>
                            )
                            : achievementItem.hours
                            ? (
                                <React.Fragment>
                                    <h2>
                                        {achievementItem.current}k+
                                    </h2>
                                    <h4>
                                        {achievementItem.name}
                                    </h4>
                                </React.Fragment>
                            )
                            : (
                                <React.Fragment>
                                    <h2>
                                        {achievementItem.current}+
                                    </h2>
                                    <h4>
                                        {achievementItem.name}
                                    </h4>
                                </React.Fragment>
                            )
                        }
                    </div>
                </ScrollAnimation>
            )
        })
    }

    render() {
        return (
            <div className={classes.Achievement}>
                <h1>Achievement</h1>
                <div className={classes.content}>
                    {this.renderAchievement()}
                </div>
            </div>
        )
    }
};