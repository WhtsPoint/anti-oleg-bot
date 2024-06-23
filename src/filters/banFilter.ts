import { Context } from 'grammy'
import { isBanned } from '../reps/bannedUsers'

export default function banFilter<C extends Context>(
	next: (ctx: C) => Promise<boolean|void>
) {
	return async (ctx: C) => {
		const senderId = ctx.from?.id

	  if (typeof senderId !== 'undefined' && typeof ctx.chatId !== 'undefined' && await isBanned(senderId, ctx.chatId)) {
			return await next?.(ctx) || true
		}

		return false
	}
}
