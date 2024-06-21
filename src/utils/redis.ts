import { createClient } from 'redis';

type Connection = ReturnType<typeof createClient>

export class Redis {
	private static connection: Connection|null = null;

	public static getConnection(): Connection {
		if (this.connection === null)	{
			this.connection = createClient()
			this.connection.connect()
		}

		return this.connection
	}
}