import { MyContext } from "../types/MyContext";

export default async function reactWithVomit(ctx: MyContext) {
	console.log(8888)
	await ctx.react('🤮')
}
