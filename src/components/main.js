import React from 'react';
import Home from './Home';
import Page from './Page';
import Setup from './Setup';
import StreetView from './StreetView';
import { Switch, Route } from 'react-router-dom';

const Main =  () => (
    <Switch>
    <Route exact path="/" component={Page} />
    <Route exact path="/setup" component={Setup} />
    <Route exact path="/map" component={Home} />
    <Route exact path="/street" component={StreetView} />
    </Switch>
)

export default Main;
