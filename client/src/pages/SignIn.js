import React from 'react';
import axios from "../axios";

import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";


function SignIn() {

	let history = useHistory();
	const onSubmit = (data) => {
		axios.post('auth/signin', data).then(({ accessToken, refreshToken }) => {
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			history.push('/files')
		})
	}

	const { register, handleSubmit } = useForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" name={'login'} placeholder={'Login'} ref={register({required: true})}/>
			<input type="password" name={'password'} ref={register({required: true})}/>
			<input type="submit" value={'Sign In'}/>
		</form>
	);
}

export default SignIn;
