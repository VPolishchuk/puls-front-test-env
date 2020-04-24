import React from "react";
import classes from './Projects.module.css'
import Project from "../../components/Project/Project";
import animarImg from '../../style/Images/ProjectImages/AnimAR.png'
import onlyFans from '../../style/Images/ProjectImages/OnlyFans.png'
import pupilHD from '../../style/Images/ProjectImages/PupilHD.png'

export default class Projects extends React.Component {

    state = {
        projects: {
            0: {
                name: 'AnimAR',
                description: ' Rescue one of the wild animals, that was taken away from their family and ended up in captivity. \n'+ 
                
                'Shelter pets to your virtual 3D home. \n' +
                'Turn on AR mode and feel the presence of real wild animals right next to you. \n' +
                
                'Pets love care and attention, to feast on their favorite food and play sports games. \n' +
                'Explore the world through the animal dreams and memories in video format on a virtual screen. \n' + 
                
                'Meditate with pets mirroring their breathing chosen in unison with healthy natural rhythms. Save your breathing progress to HealthKit. \n' +
                
                'Shoot and share realistic looking photos and videos while you are playing with animals in AR. \n' +
                
                'Take care of animals and improve your Karma of Love, Energy, Joy, Wisdom, Relax, Happiness and Health.',
                projectImage: animarImg,
                projectLinkAbout: 'https://www.producthunt.com/posts/animar-2-0'
            },
            1: {
                name: 'OnlyFans',
                description: 'OnlyFans is a subscription platform that enables content creators to monetize their influence. If you use social media and produce your own content, you should be using OnlyFans. Whether you\'re uploading tutorials, tips, behind the scenes footage or just endless selfies, a lot of your followers would be willing to pay for them!' + 
                'Anyone can earn. Make your influence pay! Safe and secure.',
                projectImage: onlyFans,
                projectLinkAbout: 'https://onlyfans.com/'
            },
            2: {
                name: 'PupilHD',
                description: 'PupilHD offers the best-in-class Live TV with more than 1000 of (Arabic, Turkish, Persian, AfghanI, Kurdish, Hindi, Urdu) channels streamed live all over the world. \n' +
                'Fast playback with a wide selection of genres.',
                projectImage: pupilHD,
                projectLinkAbout: 'http://pupilhd.com/'
            }
        }
    }

    renderProjects(){
        const {projects} = this.state;
        return Object.keys(projects).map((projectItem, index) => {
            const project = projects[projectItem];
            if (index === 1) { 
                return (
                    <Project
                    key={index}
                    dark={true}
                    name={project.name}
                    projectDescripption={project.description}
                    projectImage={project.projectImage}
                    projectLinkAbout={project.projectLinkAbout}
                />
                )                
            } else {
                return (
                    <Project
                    key={index}
                    light={true}
                    name={project.name}
                    projectDescripption={project.description}
                    projectImage={project.projectImage}
                    projectLinkAbout={project.projectLinkAbout}
                />
                )                
            }
        })
    }

    render(){
        return (
            <div className={classes.Projects}>
                {this.renderProjects()}
            </div>
        )
    }
}