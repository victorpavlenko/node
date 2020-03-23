import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Files from './pages/Files';
import File from './pages/File';
import User from './pages/User';

import Header from './components/Header';


import biohazard from "./assets/biohazard.png";

import "./styles/App.css";

export default function App() {

  return <BrowserRouter>

    <div className="App">
      <div className="App-header">
        <Header />

        <img src={biohazard} className="App-logo" alt="logo" />
        <p>Coronavirus Node.js App</p>

        <Route path={'/signin'} component={SignIn}/>
        <Route path={'/signup'} component={SignUp}/>
        <Route exact path={'/'} component={User}/>
        <Route exact path={'/user'} component={User}/>
        <Route exact path={'/files'} component={Files}/>
        <Route exact path={'/files/:id'} component={File}/>

      </div>
    </div>
  </BrowserRouter>
}
