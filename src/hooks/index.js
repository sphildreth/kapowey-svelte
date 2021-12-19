import * as cookie from 'cookie';
export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies.session && Buffer.from(cookies.session, 'base64').toString('utf-8');
	request.locals.user = jwt ? JSON.parse(jwt) : null;
    console.log({user: request.locals.user})
	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		user: locals.user
	  }
}
