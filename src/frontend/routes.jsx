import React, { Fragment } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route } from 'react-router-dom';
import App from './Components/App';
import Presentation from './Components/Presentation';

const history = createBrowserHistory();

const Routes = () => (
    <Router history={history}>
        <Fragment>
            <Route exact path="/" component={Presentation} />
            <Route path="/posts" component={App} />
            
        </Fragment>
    </Router>
);

export default Routes;