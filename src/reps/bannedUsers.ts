import { Redis } from '../utils/redis'
import objectFormTwoArrays from "../utils/objectFromTwoArrays";

export async function isBanned(userId: number, chatId: number): Promise<boolean> {
	const connection = await Redis.getConnection()

	return Boolean(await connection.exists(`ban:${chatId}:${userId}`))
}

export async function ban(userId: number, chatId: number, on: number): Promise<void> {
	const connection = await Redis.getConnection()

	await connection.set(
		`ban:${chatId}:${userId}`,
		'true',
		on !== Infinity ? { EX: on } : {}
	)
}

export async function mercy(userId: number, chatId: number): Promise<void> {
	const connection = await Redis.getConnection()
	const value = connection.getDel(`ban:${chatId}:${userId}`)
	
	if (value === null) {
		throw new Error('This user is not banned')
	}	
}

export async function getAllBanned(chatId: number): Promise<Record<string, number>> {
	const connection = await Redis.getConnection()
	const prefix = `ban:${chatId}:`

	const keys = await connection.keys(`${prefix}*`)
	const userIds = keys.map(key => key.replace(prefix, ''))
	const ttls = await Promise.all(keys.map(key => connection.ttl(key)))

	return objectFormTwoArrays(userIds, ttls.map(ttl => ttl === -1 ? Infinity : ttl))
}