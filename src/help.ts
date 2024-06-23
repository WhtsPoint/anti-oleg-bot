import { Bot, Context } from 'grammy'
import { Command } from './types/Command'

export default async function attachHelp<C extends Context>(bot: Bot<C>) {
	const commands = [
		{ command: 'olegization', description: 'Накласть проклятие Олега на чела' },
		{ command: 'deolegization', description: 'Снять проклятие Олега с чела' }
	] satisfies { command: Command, description: string }[]

  await	bot.api.setMyCommands(commands)
}
