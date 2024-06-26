import { MyContext } from '../types/MyContext'

export default async function reactWithVomit(ctx: MyContext) {
	await ctx.react('🤮')
}