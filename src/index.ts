/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Ai } from '@cloudflare/ai';

export interface Env {
	SECRET: string;
	AI: any;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);
		const ai = new Ai(env.AI);
		return new Response('please send your prompt');
		if (url.searchParams.get('prompt')) {
			const prompt = decodeURIComponent(url.searchParams.get('prompt') || '') || 'What is grouped query attention?';
			console.log('prompt', prompt);
			const response = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', {
				prompt,
			});
			console.log('response', response);
			return new Response(JSON.stringify(response));
		} else {
			return new Response('please send your prompt');
		}
	},
};
