import { Context } from 'grammy'
import { ChatMembersFlavor } from '@grammyjs/chat-members'
import { TimeFlavor } from './TimeFlavor'

export type MyContext = Context & ChatMembersFlavor & TimeFlavor