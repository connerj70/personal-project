import React from 'react';
import { Switch, Route } from 'react-router-dom';
import  Home from './components/Home/Home';
import Sell from './components/Sell/Sell';
import Messages from './components/Messages/Messages';
import BigListing from './components/BigListing/BigListing';
import About from './components/About/About';
import MyGrails from './components/MyGrails/MyGrails';
import Settings from './components/Settings/Settings';
import MyItems from './components/MyItems/MyItems';

export default (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/sell' component={Sell}></Route>
        <Route path='/messages' component={Messages}></Route>
        <Route path='/biglisting/:id' component={BigListing}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/mygrails/:id' component={MyGrails}></Route>
        <Route path='/settings' component={Settings}></Route>
        <Route path='/myitems' component={MyItems}></Route>
    </Switch>
)