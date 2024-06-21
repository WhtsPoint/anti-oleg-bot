import { Composer } from 'grammy'
import prohibitTikTok from './prohibitTikTok'
import { MyContext } from '../types/MyContext'
import getStatus from './getStatus'
import addUserToBan from './addUserToBan'
import banFilter from '../filters/banFilter'
import reactWithVomit from './reactWihVomit'

const composer = new Composer<MyContext>()
const tikTokComposer = new Composer<MyContext>()

composer.use(tikTokComposer)

composer.command('olegization', addUserToBan)
composer.command('status', getStatus)
tikTokComposer.filter(banFilter).on('message', prohibitTikTok(reactWithVomit))

export default composer