export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}
	const user = body.data.user;
	user.token = body.data.token;
	user.createdDate = new Date();	
	const value = Buffer.from(JSON.stringify(user)).toString('base64');

	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}
