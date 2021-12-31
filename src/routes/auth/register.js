import * as api from '$lib/api.js';
import { respond } from './_respond';
import { envSettings } from '$lib/envSettings.ts';

export async function post(request) {
	const body = await api.post('user/register', {
		email: request.body.email,
		username: request.body.email,
		password: request.body.password,
		valiationReturnUrl: `${ envSettings.appUrl }/register/emailvalidated`
	});

	return respond(body);
}
