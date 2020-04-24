import React from "react";
import classes from './Project.module.css'

const Project = props => {

    const cls = [classes.Project];
    if (props.dark) {
        cls.push(classes.ProjectDark)
    } else  {
        cls.push(classes.ProjectLight)
    }
    return (
        <div className={classes.Project}>
            <div
                className={cls.join(' ')}
            >
                <div className={classes.content}>
                    <div className={classes.aboutProjectText}>
                        <h1>{props.name}</h1>
                        <div>
                            <p>
                               {props.projectDescripption}
                            </p>
                        </div>
                        <div className={classes.aboutProjectLink}>
                            <a href={props.projectLinkAbout}>About project</a>
                        </div>
                    </div>
                    <div className={classes.projectImage}>
                        <img src={props.projectImage} alt={'project'}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Project;