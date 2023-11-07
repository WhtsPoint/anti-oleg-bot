import { Composer } from 'grammy'
import prohibitTikTok from './prohibitTikTok'
import { MyContext } from '../types/MyContext'
import getStatus from './getStatus'

const composer = new Composer<MyContext>()

composer.command('status', getStatus)
composer.on('message', prohibitTikTok)

export default composer