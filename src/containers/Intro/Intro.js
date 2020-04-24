import React from 'react'
import classes from './Intro.module.css'
import VerticalCarousel from "../../UI/Carousel/VerticalCarousel/VerticalCarousel";

class Intro extends React.Component {

    render() {
        return (
            <section>
                <div
                    className={classes.Intro}
                >
                    <div>

                        <VerticalCarousel/>

                        <h1>
                            Which bring <strong>you</strong> profit
                        </h1>
                    </div>

                </div>
                { this.props.children }
            </section>
        )
    }
}

export default Intro;