import { CommandMiddleware, Composer } from 'grammy'
import prohibitTikTok from './prohibitTikTok'
import { MyContext } from '../types/MyContext'
import getStatus from './getStatus'
import addUserToBan from './addUserToBan'
import banFilter from '../filters/banFilter'
import reactWithVomit from './reactWihVomit'
import replyFilter from '../filters/replyFilter'
import timeFilter from '../filters/timeFilter'
import mercyBannedUser from './mercyBannedUser'
import adminFilter from '../filters/adminFilter'
import { Command } from '../types/Command'
import avoidSpam from './avoidSpam'
import unicodeFilter from '../filters/unicodeFilter'
import getBanList from './getBanList'

const composer = new Composer<MyContext>()

const commands = {
	'olegization': adminFilter(replyFilter(timeFilter(addUserToBan))),
	'deolegization': adminFilter(replyFilter(mercyBannedUser)),
	'status': getStatus,
	'olegist': getBanList,
} as const satisfies Record<Command, CommandMiddleware<MyContext>>

Object.entries(commands).forEach(([command, callback]) => composer.command(command, callback))

composer.on('message', banFilter(unicodeFilter(avoidSpam(prohibitTikTok(reactWithVomit)))))

export default composer