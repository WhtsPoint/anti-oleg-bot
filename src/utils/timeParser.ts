const periodToSeconds: Record<string, number> = {}

periodToSeconds['s'] = 1
periodToSeconds['m'] = 60 * periodToSeconds['s']
periodToSeconds['h'] = 60 * periodToSeconds['m']
periodToSeconds['d'] = 24 * periodToSeconds['h']
periodToSeconds['w'] = 7 * periodToSeconds['d']
periodToSeconds['M'] = 31 * periodToSeconds['d']

export function stringTimeToSeconds(value: string): number {
	if (/forever/g.exec(value) !== null) return Infinity

	const matches = /([0-9]+)([Mwdms])/g.exec(value)
	
	if (matches === null) throw new Error('Invalid time format')

	const [, num, period] = matches

	return parseInt(num) * periodToSeconds[period]
}
