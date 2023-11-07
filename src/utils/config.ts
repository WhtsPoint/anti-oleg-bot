interface Config {
    BOT_PRIVATE_KEY: string
}

function getEnvOrException(key: string): string {
    const value = process.env[key]

    if (value === undefined) {
        throw new Error('Missing env by key: ' + key)
    }

    return value;
}

export const config = () => ({
    bot: {
        privateKey: getEnvOrException('BOT_PRIVATE_KEY'),
        olegId: '563399648'
    }
})
