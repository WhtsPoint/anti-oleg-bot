import { mercy } from '../reps/bannedUsers'
import { MyContext } from '../types/MyContext'

export default async function mercyBannedUser(ctx: MyContext) {
	const targetId = ctx.message?.reply_to_message?.from?.id

	if (
		typeof targetId === 'undefined'
		|| typeof ctx.chatId === 'undefined'
	) {
		throw new Error('Context is invalid')
	}

	try {
		await mercy(targetId, ctx.chatId)
	} catch (error) {
		await ctx.reply('Чел не олегизирован')
		return
	}

	await ctx.reply('Помилован')
}
