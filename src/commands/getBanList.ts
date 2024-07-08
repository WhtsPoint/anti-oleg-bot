import { MyContext } from '../types/MyContext'
import { getAllBanned } from '../reps/bannedUsers'
import banListToMarkdown from '../markdown/banListToMarkdown'

export default async function getBanList(ctx: MyContext) {
    const chatId = ctx.chatId

    if (typeof chatId === 'undefined') throw new Error('Invalid context');

    const banned = await getAllBanned(chatId)

    const users = await Promise.all(Object.keys(banned).map(userId => {
        return ctx.api.getChatMember(chatId, parseInt(userId))
    }))

    await ctx.reply(banListToMarkdown(users.map(((user, index) => {
        return { user, banPeriod: Object.values(banned)[index] }
    }))), { parse_mode: 'MarkdownV2' })
}