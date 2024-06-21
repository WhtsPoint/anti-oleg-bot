import { isBanned } from "../reps/bannedUsers"
import { MyContext } from "../types/MyContext"

export default async function banFilter(ctx: MyContext): Promise<boolean> {
	const senderId = ctx.from?.id

	return typeof senderId !== 'undefined' && typeof ctx.chatId !== 'undefined' && await isBanned(senderId, ctx.chatId) 
}
