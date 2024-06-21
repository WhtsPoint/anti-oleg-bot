const periodToSeconds: Record<string, number> = {}

periodToSeconds['s'] = 1
periodToSeconds['m'] = 60 * periodToSeconds['s']
periodToSeconds['d'] = 1440 * periodToSeconds['m']
periodToSeconds['w'] = 7 * periodToSeconds['d'] 

export function stringTimeToSeconds(value: string): number {
	if (value === 'forever') return Infinity

	const matches = /^([0-9]+)(d|w|m|s)$/g.exec(value)
	
	if (matches === null) throw new Error('Invalid time format')

	const [, num, period] = matches

	return parseInt(num) * periodToSeconds[period]
}
