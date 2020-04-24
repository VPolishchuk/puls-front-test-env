import React, { useRef, forwardRef, useEffect, useImperativeHandle } from 'react';
import * as R from 'ramda'
import classes from './Project.module.css'
import { useHistory } from "react-router-dom";
import Button from "../../../UI/Button/Button";
// features
import ProjectFrom from '../../../components/ProjectFrom/ProjectFrom';
import { ProjectDetailsPage } from '../ProjectDetailsPage/ProjectDetails';
// firebase api
import app from "../../../firebase-config";
import * as H from '../../../helpers/index';
// /////////////////////////////////////////////////////////////////////////

const db = app.firestore();

export const Project = forwardRef((props ,ref) => {
  const {
    id,
    logo,
    admin,
    title,
    hasMore,
    logoImg,
    featured,
    tagsList,
    openModal,
    closeModal,
    screenshot,
    getProject,
    description,
    setRecallInit,
    screenshotImg,
    removeDeletedPrFromList
  } = props;
  const refEl = useRef(null);
  let history = useHistory();
  const cls = [classes.Project];
  const openProjectDetailsPage = async (payload) => {
    history.push(`/project/${payload}`);
  }
  const openProjectDetailsModal = async (payload) => {
    try {
      const data =  await db.collection('projectList').doc(payload).get();
      const component = (
        <ProjectDetailsPage {...data.data()} />
      );
      openModal(component)
    } catch(err) {
      console.error(err);
    }
  }

  const handleEditProject = async (id) => {
    try {
      const data =  await db.collection('projectList').doc(id).get();
      const component = (
        <ProjectFrom 
          tagsList={tagsList}
          appP={false}
          closeModal={closeModal}
          getProject={getProject}
          setRecallInit={setRecallInit}
          initValues={{...data.data(), id: data.id}}
        />
      );
      openModal(component)
    } catch(err) {
      console.error(err);
    }
  }
  const handelDeleteProject  = async (id) => {
    const db = app.firestore();
    const cleanStorage = await app.storage().ref(`projectList/${id}`);
    db.collection('projectList').doc(id).delete()
    .then(function() {
      removeDeletedPrFromList(id)
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
  const featuredB = H.convertToBoolean(featured);
  const action = featuredB ? openProjectDetailsPage : openProjectDetailsModal;
  if (featuredB) {
    cls.push(classes.withFeatured)
  }
  if (H.convertToBoolean(logo)){
    if (H.convertToBoolean(screenshot)) {
      if (!featuredB) {
        cls.push(classes.withScreenshot)
      }
    } else {
      cls.push(classes.withoutScreenshot)
    }
  } else {
    cls.push(classes.withoutLogo)
  }

  useImperativeHandle(refEl, () => ({
    transformTextFontSize: H.transformTextFontSize(refEl)
  }));
  return (
    <div className={cls.join(' ')}>
      {
        featuredB
        ? (
          <div className={classes.titleMain}>
            {
              logoImg && 
              <div className={classes.logo}>
                <img src={logoImg} alt="logo"/>
              </div>
            }
            <div >
              <h1 ref={refEl}>{title}</h1>
            </div>
          </div>
        )
        : (
          <div className={classes.title}>
            <h1 ref={refEl}>{title}</h1>
            {
              logoImg && 
              <div className={classes.logo}>
                <img src={logoImg} alt="logo"/>
              </div>
            }
          </div>
        )
      }
      <div className={classes.content}>
        <div className={classes.description}>
            <p>{description}</p>
        </div>
        {
          screenshot
          ? <div className={classes.image}>
              <img src={screenshotImg} alt="project"/>
            </div>
          : null
        }
      </div>
      <div className={classes.button}>
        <Button
          onClick={() => action(id)}
          buttonStyle={featured ? 'dark' : 'light'}
        >
          About project
        </Button>
      </div>
      {
        admin ?
        (
          <div className={classes.actions}>
            <Button
              className={classes.delete}
              onClick={() => handelDeleteProject(id)}
            >
              D
            </Button>
            <Button
              className={classes.edit}
              onClick={() => handleEditProject(id)}
            >
              E
            </Button>
            
          </div>
        ) : null
      }
    </div>
  )
});
