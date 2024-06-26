import { Redis } from '../utils/redis'

export async function addMessage(
    chatId: number, userId: number, messageId: number
): Promise<void> {
    const connection = await Redis.getConnection()
    const key = `spam:${chatId}:${userId}`

    await connection.lPush(key, messageId.toString())
    await connection.expire(key, 60)
}

export async function getMessageCount(
    chatId: number, userId: number
): Promise<number> {
    const connection = await Redis.getConnection()

    return await connection.lLen(`spam:${chatId}:${userId}`)
}

export async function popAllMessages(
    chatId: number, userId: number
): Promise<number[]> {
    const connection = await Redis.getConnection()
    const key = `spam:${chatId}:${userId}`
    const messages = await connection.lRange(key, 0, -1)

    await connection.del(key)

    return messages.map(message => + message)
}