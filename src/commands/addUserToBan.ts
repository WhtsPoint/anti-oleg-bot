import { ban } from '../reps/bannedUsers'
import { MyContext } from '../types/MyContext'

export default async function addUserToBan(ctx: MyContext) {
	const targetId = ctx.message?.reply_to_message?.from?.id
  	const period = ctx.time

	if (
		typeof targetId === 'undefined'
		|| typeof period === 'undefined'
		|| typeof ctx.chatId === 'undefined'
	) {
		throw new Error('Context is invalid')
	}

	await ban(targetId, ctx.chatId, period)
	await ctx.reply('Олегизирован')
}