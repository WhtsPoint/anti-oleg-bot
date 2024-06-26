import { isTikTok, isHasBadWords } from '../utils/validation'
import { MyContext } from '../types/MyContext'

export default function prohibitTikTok(next: (ctx: MyContext) => Promise<any>) {
	return async (ctx: MyContext) => {
		const message = ctx.message?.text
		if (
			message === undefined
			|| (!isTikTok(message) && !isHasBadWords(message))
		) return await next(ctx)

		await ctx.deleteMessage()
	}
}