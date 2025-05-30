'use client'

import { rules21step as rules } from './beaver-rules'
import { Direction } from './beaver.types'

let index = 0
let rule: string | undefined = 'a'
let plusArr = [0]
let minusArr: number[] = []
let steps = 0

let running = true
let halted: boolean = false

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

const move = ({ direction }: { direction: Direction }) => {
	console.log('moving', direction, 'from index', index)
	if (direction === Direction.Left) index--
	else if (direction === Direction.Right) index++
	const { arr, arrIndex } = tickertape()
	if (arr[arrIndex] === undefined) {
		arr[arrIndex] = 0
	}
}

const writes = ({ write }: { write: number }) => {
	console.log('writing', write, 'at index', index)
	const { arr, arrIndex } = tickertape()
	arr[arrIndex] = write
}

const assign = ({ next }: { next: string }) => {
	rule = next
	console.log('Assigning rule', rule, 'at index', index)
}

const extract = () => {
	try {
		const { arr, arrIndex } = tickertape()
		return rules[rule!][arr[arrIndex]]
	} catch (error) {
		return { error: true, next: undefined, write: 0, direction: Direction.Right }
	}
}

const tickertape = () => {
	const arr = index < 0 ? minusArr : plusArr
	const absIndex = Math.abs(index)
	const absOffset = index < 0 ? -1 : 0
	const arrIndex = absIndex + absOffset
	return { arr, arrIndex }
}

const busy = async () => {
	while (running) {
		steps++
		const { direction, write, next, error } = extract()
		if (error) return stop()
		writes({ write })
		move({ direction })
		if (!next) return stop({ halt: true })
		assign({ next })
		console.log({ minusArr, plusArr, index, rule, steps })
		// await sleep(500)
	}
}

const reset = () => {
	index = 0
	rule = 'a'
	plusArr = [0]
	minusArr = []
	steps = 0
	running = true
	halted = false
	console.log('Resetting the beaver. Press Start ot begin.', { minusArr, plusArr, index, rule, steps, rules })
}

const start = () => {
	if (halted) return console.log('beaver is halted, cannot start again. Please reset.', { minusArr, plusArr, index, rule, steps, rules })
	running = true
	console.log('Starting the beaver', { minusArr, plusArr, index, rule, steps, rules })
	busy()
}

const stop = ({ halt = false }: { halt?: boolean } = {}) => {
	halted = halted || halt
	running = false
	console.log(`${halt ? 'Halting' : 'Pausing'} the beaver`, { minusArr, plusArr, index, rule, steps, rules })
}

export default function Beaver() {
	console.log('Press Start on the page!')
	return (
		<div className='flex flex-col items-center justify-center min-h-screen gap-5'>
			<div className='text-center'>Press F12 to open the console. It's a lot easier than writting some code that your browser can natively do. I'm not as good as Google!</div>
			<button onClick={() => start()}>Start</button>
			<button onClick={() => reset()}>Reset</button>
			<button onClick={() => stop()}>Pause</button>
		</div>
	)
}
