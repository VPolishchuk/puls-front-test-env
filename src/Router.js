import React from 'react';
import './style/reset.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainPageLayout from "./containers/Pages/MainPage/MainPageLayout";
import AuthPageLayout from "./containers/Pages/AuhtPage/AuthPageLayout";
import PortfolioPageLayout from "./containers/Pages/Portfolio/PortfolioPageLayout";
import ProjectDetailsPage from "./containers/Pages/ProjectDetailsPage/ProjectDetailsPage";
import FirebaseProvider from './firebase-auth';

function App() {
  return (
    <FirebaseProvider>
      <Router basename="/puls-front-test-env/">
        <Switch>
          <Route path='/' exact component={MainPageLayout}/>
          <Route path='/software' component={''}/>
          <Route path='/design' component={''}/>
          <Route path='/login' component={AuthPageLayout}/>
          <Route path='/portfolio' component={PortfolioPageLayout}/>
          <Route path='/project/:id' component={ProjectDetailsPage}/>
        </Switch>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
