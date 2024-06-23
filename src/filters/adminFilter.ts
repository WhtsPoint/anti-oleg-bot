import { Context } from 'grammy'

export default function adminFilter<C extends Context>(
	next?: (ctx: C) => Promise<boolean|void>
) {
	return async (ctx: C) => {
		const role = (await ctx.getAuthor()).status

		if (role !== 'creator') {
			return false
		}

		return await next?.(ctx) || true
	}
}
