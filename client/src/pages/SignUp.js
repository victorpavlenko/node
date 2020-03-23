import React from 'react';
import axios from "../axios";

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function SignUp() {

	let history = useHistory();
	const onSubmit = (data) => {
		axios.post('auth/signup', data).then((res) => {
			history.push('/signin')
		})
	}

	const { register, handleSubmit } = useForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" name={'login'} placeholder={'Login'} ref={register({required: true})}/>
			<input type="password" name={'password'} placeholder={'********'}  ref={register({required: true})}/>
			<input type="submit" value={'Sign Up'}/>
		</form>
	);
}

export default SignUp;
