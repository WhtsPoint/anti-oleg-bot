import { Redis } from "../utils/redis"

export async function isBanned(userId: number, chatId: number): Promise<boolean> {
	console.log(await Redis.getConnection().exists(`ban:${chatId}:${userId}`))
	return Boolean(await Redis.getConnection().exists(`ban:${chatId}:${userId}`))
}

export async function ban(userId: number, chatId: number, on: number): Promise<void> {
	await Redis.getConnection().set(
		`ban:${chatId}:${userId}`,
		'true',
		on !== Infinity ? { EX: on } : {}
	)
}
