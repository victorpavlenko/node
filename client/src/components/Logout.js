import React, { useCallback } from "react";
import {useHistory} from "react-router-dom";
import axios from "../axios";

export default () => {
	let history = useHistory();

	const logout = useCallback(async (file) => {
	  await axios.get(`auth/logout`)
	      .then((res) => {
		      localStorage.removeItem('accessToken')
		      localStorage.removeItem('refreshToken')
	        history.push("/signin");
	      })
	}, [])

	return <span className={'App-link'} onClick={logout}>Logout</span>
}