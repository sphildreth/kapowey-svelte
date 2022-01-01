import { envSettings } from '$lib/envSettings.ts';

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if(method === 'PATCH') {
		opts.headers['Content-Type'] = 'application/json-patch+json';
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	opts.headers['Kapowey-App-Id'] = envSettings.apiAppId;

	return fetch(`${envSettings.apiUrl}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}

export function patch(path, data, token) {
	return send({ method: 'PATCH', path, data, token });
}
