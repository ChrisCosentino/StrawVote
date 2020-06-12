import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import CreatePoll from './components/CreatePoll';
import Poll from './components/Poll';
import NoMatch from './components/NoMatch';
import Search from './components/Search';
import Results from './components/Results';
import { NotificationContainer } from 'react-notifications';

import './styles.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";




const App = () => {
  return(

    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/create" component={CreatePoll} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/404" component={NoMatch} />
          <Route exact path="/:id" component={Poll} />
          <Route exact path="/:id/results" component={Results} />
        </Switch>
        <NotificationContainer />
      </Fragment>
    </Router>

    
  )
}

export default App;
