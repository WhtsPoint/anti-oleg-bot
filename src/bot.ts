import bootstrap from '../bootstrap'
import { Bot, MemorySessionStorage } from 'grammy'
import { type ChatMember } from 'grammy/types'
import { config } from './utils/config'
import commands from './commands'
import { chatMembers } from '@grammyjs/chat-members'
import { MyContext } from './types/MyContext'
import attachHelp from './help'
import timeMiddleware from './middlewares/timeMiddleware'

bootstrap()

const adapter = new MemorySessionStorage<ChatMember>()
const bot = new Bot<MyContext>(config().bot.privateKey)

bot.use(chatMembers(adapter))
bot.use(timeMiddleware())
bot.use(commands)

bot.start({
	allowed_updates: ['chat_member', 'message'],
	onStart: async () => {
		console.log('Bot stared')
		await attachHelp<MyContext>(bot)	
	}
})