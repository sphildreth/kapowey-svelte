import { envSettings } from '$lib/envSettings.ts';
export function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json',
			'Kapowey-App-Id': envSettings.apiAppId
		}
	}).then((r) => r.json());
}
