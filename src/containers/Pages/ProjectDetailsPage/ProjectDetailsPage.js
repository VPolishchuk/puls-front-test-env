import React from 'react';
import Loader from '../../../containers/Loader/index';
import classes from './ProjectDetailsPage.module.css';
import ProjectDetails from "../../../components/PortfolioProjects/ProjectDetailsPage/ProjectDetails";
import Button from '../../../UI/Button/Button';
// firebase api
import app from "../../../firebase-config";
// hocs
import withLayout from '../../../hoc/with-layout';
// /////////////////////////////////////////////////////////

const db = app.firestore();

class ProjectDetailsPage extends React.Component {

  state = {
    loader: false,
    details: {}
  };
  getProjectDetails = async (payload) => {
    try {
      const match = this.props.match;
      const { params } = match;
      const res = await db.collection('projectList').doc(params.id).get();
      this.setState({ details: {...res.data()} })
      this.setState({ loader: false })
    } catch (err) {
      console.error(err);
    }
  }
  componentDidMount() {
    this.setState({ loader: true })
    this.getProjectDetails();
  }
  render(){
    return (
      <div className={classes.DetailsPageWrap}>
        <main>
          <Button onClick={() => this.props.history.push('/portfolio')}>{'< Back'}</Button>
          {
            this.state.loader ?
            <Loader /> :
            <ProjectDetails {...this.props} {...this.state.details} />
          }
        </main>
      </div>
    )
  }
};

export default withLayout(ProjectDetailsPage);