import { MyContext } from '../types/MyContext'

export default async function getStatus(ctx: MyContext) {
   await ctx.reply('alive')
}