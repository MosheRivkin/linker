import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	return { url: url.origin };
}) satisfies PageServerLoad;
