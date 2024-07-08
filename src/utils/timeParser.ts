const periodToSeconds: Record<string, number> = {}

periodToSeconds['s'] = 1
periodToSeconds['m'] = 60 * periodToSeconds['s']
periodToSeconds['h'] = 60 * periodToSeconds['m']
periodToSeconds['d'] = 24 * periodToSeconds['h']
periodToSeconds['w'] = 7 * periodToSeconds['d']
periodToSeconds['M'] = 31 * periodToSeconds['d']

const sequence = ['M', 'd', 'h', 'm', 's'] as const

export function stringTimeToSeconds(value: string): number {
	if (/forever/g.exec(value) !== null) return Infinity

	const matches = /([0-9]+)([Mwdms])/g.exec(value)
	
	if (matches === null) throw new Error('Invalid time format')

	const [, num, period] = matches

	return parseInt(num) * periodToSeconds[period]
}

export function secondsToString(value: number): string {
	let index = 0
	let result: Record<string, number> = {}

	while (value > 0 && index < sequence.length) {
		const key = sequence[index]
		const count = Math.floor(value / periodToSeconds[key])

		if (count !== 0) {
			result[key] = Math.floor(value / periodToSeconds[key])
			value -= result[key] * periodToSeconds[key]
		}

		index++
	}

	return Object.entries(result).map(([key, value]) => value + key).join(' ')
}