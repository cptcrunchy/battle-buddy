import { functions, inngest } from '$lib/inngest';
import INNGEST_SIGNING_KEY from '$env/static/private';
import { serve } from 'inngest/sveltekit';

export const { GET, POST, PUT } = serve({ 
  client: inngest, 
  functions,
  signingKey: INNGEST_SIGNING_KEY
});