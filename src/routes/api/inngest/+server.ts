import { functions, inngest } from '$lib/inngest';
import { INNGEST_SIGNING_KEY } from '$env/static/private';
import { serve } from 'inngest/sveltekit';

const inngestServe = serve({ client: inngest, functions, signingKey: `${INNGEST_SIGNING_KEY}`})
export const GET = inngestServe.GET;
export const POST = inngestServe.POST;
export const PUT = inngestServe.PUT;