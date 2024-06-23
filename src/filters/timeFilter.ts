import { Context } from 'grammy'
import { TimeFlavor } from '../types/TimeFlavor'

export default function timeFilter<C extends Context & TimeFlavor>(
	next?: (ctx: C) => Promise<boolean|void>,
	message: string = 'Период введи, пиздахряк'
) {
	return async (ctx: C): Promise<boolean> => {
		if (typeof ctx.time === 'undefined') {
			await ctx.reply(message)

			return false
		}

		return await next?.(ctx) || true
	} 
}
