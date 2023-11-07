import { isTikTok, isOleg, isHasBadWords } from '../utils/validation'
import { MyContext } from '../types/MyContext'

export default async function prohibitTikTok(ctx: MyContext) {
    const senderId = ctx.from?.id?.toString()
    const message = ctx.message?.text

    if (senderId === undefined || !isOleg(senderId)) return
    if (
        message === undefined
        || (!isTikTok(message) && !isHasBadWords(message))
    ) return

    await ctx.deleteMessage()
}