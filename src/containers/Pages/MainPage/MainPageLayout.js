import React from 'react'
import Intro from "../../Intro/Intro";
import Achievement from "../../../components/Achievement/Achievement";
import TechnologiesAndApproach from "../../../hoc/TechnologiesAndApproach/TechnologiesAndApproach";
import Projects from "../../../hoc/Projects/Projects";
import TrustedBy from "../../../components/TrustedBy/TrustedBy";
import UpworkFeedback from '../../UpworkFeedback/UpworkFeedback'
import Form from "../../Form/Form";
// hocs
import withLayout from '../../../hoc/with-layout';
// //////////////////////////////////////////////////////
export const MainPageLayout = () => {
  return (
    <React.Fragment>
      <Intro/>
      <Achievement/>
      <TechnologiesAndApproach/>
      <Projects/>
      <TrustedBy/>
      <UpworkFeedback/>
      <Form/>
    </React.Fragment>
  )
};

export default withLayout(MainPageLayout);
