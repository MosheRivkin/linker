import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
	let url = await platform?.env.URL.get(params.url_id);
	// redirect to the url
	throw redirect(302, url);
};

export const POST: RequestHandler = async ({ params, request, platform }) => {
	let req = await request.json();
	let res;
	let responseInit = {
		headers: {
			'content-type': 'application/json'
		}
	};

	try {
		res = await platform?.env.URL.put(params.url_id, req.url);
	} catch (e) {
		return new Response(
			JSON.stringify({
				error: e
			}),
			responseInit
		);
	}
	return new Response(
		JSON.stringify({
			id: params.url_id,
			url: req.url,
			res: res
		}),
		responseInit
	);
};
