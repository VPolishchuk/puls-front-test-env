import React from "react";
import classes from './Technologies.module.css';
import '../../style/Images/Icons/Technologies/MobileDevelopment'
import MobileDevelopment from "../../style/Images/Icons/Technologies/MobileDevelopment";
import WebDevelopment from "../../style/Images/Icons/Technologies/WebDevelopment";
import GameDevelopment from "../../style/Images/Icons/Technologies/GameDevelopment";
import VrTechnologies from "../../style/Images/Icons/Technologies/VRTechnologies";
import Design from "../../style/Images/Icons/Technologies/Design";
import Wearable from "../../style/Images/Icons/Technologies/Wearable";

const Technologies = () => {

    return (
        <div className={classes.Technologies}>
            <h1>Our Technologies</h1>
            <div>
                <div className={classes.content}>
                    <div className={classes.mobileDevIcon}>
                        <MobileDevelopment/>
                    </div>

                    <div>
                        <h4>Mobile Development</h4>
                        <p>
                            Apps for iOS built with Objective-C, Swift
                            Apps for Android built with Java, Kotlin
                        </p>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.webDevIcon}>
                        <WebDevelopment/>
                    </div>
                    <div>
                        <h4>Web Development</h4>
                        <p>
                            Frontend Development with React.js
                            Backend Development with Node.js
                        </p>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.gameDevIcon}>
                        <GameDevelopment/>
                    </div>
                    <div>
                        <h4>Game Development</h4>
                        <p>
                            Cross-platform game development with Unity
                            iOS Game development on SceneKit and SpriteKit
                        </p>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.vrIcon}>
                        <VrTechnologies/>
                    </div>
                    <div>
                        <h4>VR/AR Development</h4>
                        <p>
                            AR projects on ARKit / ARCore / AR Foundation / ViroCore
                            VR projects for Oculus, HTC Vive, Microsoft Hololens
                        </p>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.designIcon}>
                        <Design/>
                    </div>
                    <div>
                        <h4>UI/UX Design</h4>
                        <p>
                            UI/UX Design of Applications and Websites
                            2D/3D Art for apps and games
                        </p>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.wearIcon}>
                        <Wearable/>
                    </div>
                    <div>
                        <h4>Wearables development</h4>
                        <p>
                            Apps for Apple Watch and Apple TV
                            Apps for Android Wear and Android TV
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Technologies;