import * as cookie from 'cookie';

function parseJwt (token) {
	if(!token) {
		return null;
	}
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('utf8').split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies.session && Buffer.from(cookies.session, 'base64').toString('utf-8');
	request.locals.user = jwt ? JSON.parse(jwt) : null;
	if(request.locals.user) {
		var parsedJwt = parseJwt(request.locals.user.token);
		if(parsedJwt.role) {
			request.locals.user.isAdmin = parsedJwt.role.indexOf("Admin") > -1;
			request.locals.user.isManager = parsedJwt.role.indexOf("Manager") > -1;
			request.locals.user.isEditor = parsedJwt.role.indexOf("Editor") > -1;
			request.locals.user.isContributor = parsedJwt.role.indexOf("Contributor") > -1;
		}
    	console.log({user: request.locals.user, jwt: parsedJwt})
	}
	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		user: locals.user
	  }
}
