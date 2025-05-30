
export enum Direction {
	Left = 'left',
	Right = 'right',
}

interface Rule {
	direction: Direction
	write: number
	next?: string
	error?: boolean
}

export interface Rules {
	[key: string]: Rule[]
}