import { Bot, Context } from "grammy";

export default async function attachHelp<C extends Context>(bot: Bot<C>) {
  await	bot.api.setMyCommands([
		{ command: 'olegization', description: 'Накласть проклятие Олега на чела'}
	])
}
