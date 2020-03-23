import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Logout from './Logout';
import "../styles/App.css";

export default function Header() {

  let location = useLocation();
  let isSignUp = location.pathname.includes('/signup');
  let isSignIn = location.pathname.includes('/signin');

  return <div style={{ position: "absolute", top: 0, right: 0, padding: "2rem" }}>
    {(!isSignUp && !isSignIn) && <Link className="App-link" to={'/user'}>User</Link>}&nbsp;&nbsp;
    {(!isSignUp && !isSignIn) && <Logout />}
    {isSignUp && <Link className="App-link" to={'/signin'}>Sign in</Link>}
    {isSignIn && <Link className="App-link" to={'/signup'}>Sign up</Link>}
  </div>
}
