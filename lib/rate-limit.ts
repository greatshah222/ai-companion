import { Ratelimit } from "@upstash/ratelimit";

import { Redis } from "@upstash/redis";

export const rateLimit = async (identifier: string) => {
	const rateLimit1 = new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(10, "10 s"), // can make max of 10 call in 10 second

		analytics: true,
		prefix: "@upstash/ratelimit",
	});

	return await rateLimit1.limit(identifier);
};
