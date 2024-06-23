import { Context } from 'grammy'

export default function replyFilter<C extends Context>(
	next?: (ctx: C) => Promise<boolean|void>,
	message: string = 'Нету цели'
) {
	return async (ctx: C) => {
		if (typeof ctx.message?.reply_to_message === 'undefined') {
			await ctx.reply(message)

			return false
		}

		return await next?.(ctx) || true
	}
}
