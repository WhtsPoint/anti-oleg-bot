interface Config {
	bot: {
		olegId: string,
    privateKey: string,
	},
	redis: {
		url: string
	}
}

function getEnvOrException(key: string): string {
	const value = process.env[key]

	if (value === undefined) {
		throw new Error('Missing env by key: ' + key)
	}

	return value;
}

export const config = (): Config => ({
	bot: {
		privateKey: getEnvOrException('BOT_PRIVATE_KEY'),
		olegId: '563399648'
	},
	redis: {
		url: getEnvOrException('REDIS_URL')
	}
})
