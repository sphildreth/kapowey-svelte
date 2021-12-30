import { serialize } from 'cookie';
import { envSettings } from '$lib/envSettings.ts';
export function respond(body) {
	if (!body.isSuccess) {
		return { status: 401, body };
	}
	const user = body.data.user;
	user.token = body.data.token;
	user.createdDate = new Date();	
	const value = Buffer.from(JSON.stringify(user)).toString('base64');

	return {
		headers: {
			'Set-Cookie': serialize('session', `${value}`, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: envSettings.environment === 'production',
				maxAge: 60 * 60 * 24 * 7, // one week
			}),
		},		
		body
	};
}
