import * as api from '$lib/api.js';
import { respond } from './_respond';

export async function post(request) {
	const body = await api.post('user/register', {
		email: request.body.email,
		username: request.body.email,
		password: request.body.password
	});

	return respond(body);
}
