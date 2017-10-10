import React from 'react';
import { Switch, Route } from 'react-router-dom';
import  Home from './components/Home/Home';
import Sell from './components/Sell/Sell';

export default (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/sell' component={Sell}></Route>
    </Switch>
)