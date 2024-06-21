import { ban } from "../reps/bannedUsers"
import { MyContext } from "../types/MyContext"
import { stringTimeToSeconds } from "../utils/timeParser"

export default async function addUserToBan(ctx: MyContext) {
	const targetId = ctx.message?.reply_to_message?.from?.id
  const period = ctx.match

	if (typeof targetId === 'undefined') {
		return ctx.reply('Нету цели')
	}

	if (typeof period !== 'string' || period === '') {
		return ctx.reply('Ебалай, период где?')
	}

	let seconds

	try {
		seconds = stringTimeToSeconds(period)
	} catch (error) {
		return ctx.reply('Если ты не введёшь правильный период, я себе очко разорву!')
	}

	const chat = await ctx.getChat()

	ban(targetId, chat.id, seconds)
}