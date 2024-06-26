import { Redis } from '../utils/redis'

export async function isBanned(userId: number, chatId: number): Promise<boolean> {
	const connection = await Redis.getConnection()

	return Boolean(connection.exists(`ban:${chatId}:${userId}`))
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
