import { Context, Middleware } from 'grammy'
import { TimeFlavor } from '../types/TimeFlavor'
import { stringTimeToSeconds } from '../utils/timeParser'

export default function timeMiddleware<C extends Context & TimeFlavor>(): Middleware<C> {
	return async (ctx, next) => {
		const message = ctx.message?.text

		if (typeof message === 'string') {
			try {
				ctx.time = stringTimeToSeconds(message)
			} catch {}
		}

		await next()
	}
}
