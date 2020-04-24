import React, { useContext } from 'react';
import ProjectFrom from '../ProjectFrom/ProjectFrom';
import Button from '../../UI/Button/Button';
import { AuthContext } from '../../firebase-auth';
import classes from './AddProjectButton.module.css';

const AddProjectButton = ({ openModal, closeModal, tagsList, getProject, setRecallInit }) => {
  const { currentUser } = useContext(AuthContext);
  const handelAddProject  = (id) => {
    const component = (
      <ProjectFrom
        appPr={true}
        tagsList={tagsList}
        closeModal={closeModal}
        getProject={getProject}
        setRecallInit={setRecallInit}
      />
    );
    openModal(component)
  }
  let admin = false;
  if (currentUser) {
    admin = true;
  } else {
    return null;
  }
 return (
   <div className={classes.ButtonWrap}>
    <Button onClick={() => handelAddProject()}>Add New Project</Button>
   </div>
 )
};

export default AddProjectButton