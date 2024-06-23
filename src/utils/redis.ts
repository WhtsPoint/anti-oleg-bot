import { createClient } from 'redis'
import { config } from './config'

type Connection = ReturnType<typeof createClient>

export class Redis {
	private static connection: Connection|null = null;

	public static getConnection(): Connection {
		if (this.connection === null)	{
			this.connection = createClient({ url: config().redis.url})
			this.connection.connect()
		}

		return this.connection
	}
}