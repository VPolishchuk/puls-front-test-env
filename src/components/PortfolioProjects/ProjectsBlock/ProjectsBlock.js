import React, { Fragment, useContext } from 'react';
import * as R from 'ramda';
import InfiniteScroll from "react-infinite-scroll-component";
import classes from './ProjectsBlock.module.css';
import {Project} from "../Project/Project";
import { AuthContext } from '../../../firebase-auth';
import * as H from '../../../helpers/index';
import { Loader } from '../../../containers/Loader/index';

const sortProjects = (projects) => {
  const featuresList = projects.filter((pr) => {if (H.convertToBoolean(pr.featured)) return pr});
  let withScreenshotPrList = projects.filter((pr) => {if (!H.convertToBoolean(pr.featured) && H.convertToBoolean(pr.screenshot)) return pr});
  let withLogoPrList = projects.filter((pr) => {if (!H.convertToBoolean(pr.featured) && !H.convertToBoolean(pr.screenshot) && H.convertToBoolean(pr.logo)) return pr});
  let onlyTextPrList = projects.filter((pr) => {if (!H.convertToBoolean(pr.featured) && !H.convertToBoolean(pr.screenshot) && !H.convertToBoolean(pr.logo)) return pr});
  let smallProjects = [];
  smallProjects.push(...withLogoPrList, ...onlyTextPrList);
  let mainArr = [];
  if (featuresList.length === 0) {
    let subProject = [];
    subProject.push(...withScreenshotPrList, ...smallProjects);
    const singlObj = {
      subProject
    }
    mainArr.push(singlObj);
    return mainArr;
  }
  let newPr = featuresList.map((item, i, arrPr) => {
    const subProject = [];
    const lastIndex = featuresList.length - 1;
    if (arrPr.length === 1 || lastIndex === i) {
      subProject.push(...withScreenshotPrList, ...smallProjects);
      return mainArr.push({
        ...item,
        subProject
      })
    }
    
    if (withScreenshotPrList.length > 4) {
      const addPr = withScreenshotPrList.slice(0, 4);
      withScreenshotPrList.splice(0, 4)
      subProject.push(...addPr)
      return mainArr.push({...item, subProject});
    } else {
      let pickPr = 8;
      if (withScreenshotPrList.length !== 0) {
        subProject.push(...withScreenshotPrList);
        pickPr = (8 - withScreenshotPrList.length*2);
        withScreenshotPrList.splice(0, withScreenshotPrList.length)
      }
      const addPr = smallProjects.slice(0, pickPr);
      smallProjects.splice(0, pickPr)
      subProject.push(...addPr)
      return mainArr.push({...item, subProject});
    }
  })

  return mainArr;
}

export const ProjectsBlock = ({
  hasMore,
  tagsList,
  projects,
  openModal,
  closeModal,
  getProject,
  getMoreData,
  setRecallInit,
  removeDeletedPrFromList
}) => {
  const { currentUser } = useContext(AuthContext);
  let admin = false;
  if (currentUser) {
    admin = true;
  }
  let projectsList = sortProjects(projects);
  return (
    <InfiniteScroll
      dataLength={projects.length}
      next={getMoreData}
      hasMore={hasMore}
      scrollThreshold='80%'
      loader={<div style={{
        margin: '10px auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Loader />
      </div>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b></b>
        </p>
      }
    >
      {
        Object.values(projectsList).map((projectItem, index) => {
          const isSubPrExist = projectItem.subProject.length > 0;
          return (
            <Fragment key={index}>
              {
                projectItem.featured
                ? (
                  <div className={classes.ProjectsBlock}>
                    <Project
                      admin={admin}
                      hasMore={hasMore}
                      tagsList={tagsList}
                      id={projectItem.id}
                      openModal={openModal}
                      getProject={getProject}
                      closeModal={closeModal}
                      logo={projectItem.logo}
                      title={projectItem.title}
                      setRecallInit={setRecallInit}
                      logoImg={projectItem.logoImg}
                      featured={projectItem.featured}
                      screenshot={projectItem.screenshot}
                      description={projectItem.description}
                      screenshotImg={projectItem.screenshotImg}
                      removeDeletedPrFromList={removeDeletedPrFromList}
                    />
                  </div>
                ) : null
              }
              <div className={classes.ProjectsBlock}>
                {
                  isSubPrExist ? 
                  (
                    Object.values(projectItem.subProject).map((projectItem, i) => {
                      return (
                        <Project
                          key={++i}
                          admin={admin}
                          hasMore={hasMore}
                          tagsList={tagsList}
                          id={projectItem.id}
                          openModal={openModal}
                          getProject={getProject}
                          closeModal={closeModal}
                          logo={projectItem.logo}
                          title={projectItem.title}
                          setRecallInit={setRecallInit}
                          logoImg={projectItem.logoImg}
                          featured={projectItem.featured}
                          screenshot={projectItem.screenshot}
                          description={projectItem.description}
                          screenshotImg={projectItem.screenshotImg}
                          removeDeletedPrFromList={removeDeletedPrFromList}
                        />
                      )
                    })
                  ): null
                }
              </div>
            </Fragment>
          )}
        )
      }
    </InfiniteScroll>
  ) 
}

export default ProjectsBlock;
