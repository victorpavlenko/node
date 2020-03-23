import React, { useEffect, useState } from 'react';
import axios from "../axios";
import { Link } from "react-router-dom";
import pic from "../assets/user.png";


export default () => {

	const [user, setUser] = useState({});

	useEffect(() => {(async function f() {
		try{
			let { user } = await axios.get('user/info')
			setUser(user)
		} catch(e) {
			console.log(e)
		}
	})()}, []);

	const getDate = (time) => {
		return `${new Date(time).getDate()}.${new Date(time).getMonth()} ${new Date(time).getHours()}:${new Date(time).getMinutes()}`
	}

	if(!user.id) {
		return null;
	}
	return <div>

		<table style={{ width: '100%' }}>
			<tbody>
			<tr>
				<td rowSpan={5}>
					<div><img src={pic} style={{height: "15rem"}}/></div>
				</td>
			</tr>
			<tr><td>Identification number:</td><td>{user.id}</td></tr>
			<tr><td>Login:</td><td>{user.login}</td></tr>
			<tr><td>Date of death:</td><td>{getDate(user.createdAt)}</td></tr>
			<tr><td>Cause of death:</td><td>Coronavirus &nbsp; <i className={'fas fa-dna'} style={{ color: "#c3ff8f", fontSize: "1.6rem" }}/></td></tr>
			</tbody>
		</table>

		<br/>
		<br/>
		<Link className="App-link"  to={'/files'}>Back to files</Link>

	</div>
}