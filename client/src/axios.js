import axios from "axios";

const set = (name, token) =>  localStorage.setItem(name, token)
const get = (name) =>  localStorage.getItem(name)
const remove = (name) =>  localStorage.removeItem(name)


const instance = axios.create({
	baseURL: 'http://localhost:3000/api/',
	timeout: 1000,
	headers: {
		authorization: get('accessToken')
	}
});

const requestError = error => Promise.reject(error)
const requestSuccess = config => {
	const token = get('accessToken');
	if (token) {
		config.headers.authorization = 'Bearer ' + token;
	}
	return config;
}





const responseSuccess = (response) => {
	if(response.headers['x-token']) {
		set('accessToken', response.headers['x-token'])
	}
	return response.data
}
const responseError = (error) => {

	const original = error.config;
	const status = error.response.status;

	if ((status === 401 && original.url.includes('auth/new_token')) || status === 403) {
		window.location = '/signin';
		remove('accessToken');
		remove('refreshToken');
		return Promise.reject(error);
	}

	if (error.response.status === 401 && !original._retry) {

		original._retry = true;

		return instance.post('auth/new_token', {"refreshToken": get('refreshToken')})
			.then(({ accessToken, refreshToken }) => {
				set('accessToken', accessToken);
				set('refreshToken', refreshToken);
				instance.defaults.headers.authorization = 'Bearer ' + get('accessToken');
				return instance(original);
			})
			.catch(() => {
				window.location = '/signin'
			})
	}

	return Promise.reject(error);
};

instance.interceptors.request.use(requestSuccess, requestError);
instance.interceptors.response.use(responseSuccess, responseError);

export default instance;