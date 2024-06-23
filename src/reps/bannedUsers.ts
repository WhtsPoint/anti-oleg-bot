import { Redis } from '../utils/redis'

export async function isBanned(userId: number, chatId: number): Promise<boolean> {
	return Boolean(await Redis.getConnection().exists(`ban:${chatId}:${userId}`))
}

export async function ban(userId: number, chatId: number, on: number): Promise<void> {
	await Redis.getConnection().set(
		`ban:${chatId}:${userId}`,
		'true',
		on !== Infinity ? { EX: on } : {}
	)
}

export async function mercy(userId: number, chatId: number): Promise<void> {
	const value = await Redis.getConnection().getDel(`ban:${chatId}:${userId}`)
	
	if (value === null) {
		throw new Error('This user is not banned')
	}	
}
