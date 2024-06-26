import { MyContext } from '../types/MyContext'
import { addMessage, getMessageCount, popAllMessages } from '../reps/spamMessages'

export default function avoidSpam(
    next?: (ctx: MyContext) => Promise<void>,
    maxMessageLength: number = 5,
    maxMessageCount: number = 2,
) {
    return async (ctx: MyContext) => {
        const chatId = ctx.chatId
        const message = ctx.message

        if (
            typeof chatId === 'undefined'
            || typeof message?.text === 'undefined'
            || message.text.trim().length > maxMessageLength
        ) return next?.(ctx)

        await addMessage(chatId, message.from.id, message.message_id)

        const messagesCount = await getMessageCount(chatId, message.from.id)

        if (messagesCount >= maxMessageCount) {
            const allMessages = await popAllMessages(chatId, message.from.id)

            await ctx.api.deleteMessages(chatId, allMessages)

            return
        }

        return next?.(ctx)
    }
}