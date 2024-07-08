import { ChatMember } from 'grammy/types'
import { secondsToString } from '../utils/timeParser'
import escapeMarkdown from "../utils/escapeMarkdown";

function periodToString(period: number): string {
    return period === Infinity ? 'навсегда😈' : `на ${secondsToString(period)}`
}

export default function banListToMarkdown(banList: { user: ChatMember, banPeriod: number }[]): string {
    return banList.length > 0 ? '*Список лохов:*\n\n' +
        banList.map(({ user, banPeriod }) => {
            const username = user.user.username
            const displayName = escapeMarkdown(username ? `@${username}` : user.user.first_name)

            return displayName + ' олегезирован *' + periodToString(banPeriod) + '*'
        }).join('\n') : '*Нету жертв проклятия Олега*'
}