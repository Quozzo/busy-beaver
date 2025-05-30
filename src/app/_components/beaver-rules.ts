import { Direction, Rules } from "./beaver.types";

export const rules21step: Rules = {
	a: [
		{
			write: 1,
			direction: Direction.Right,
			next: 'b',
		},
		{
			write: 1,
			direction: Direction.Right,
		},
	],
	b: [
		{
			write: 1,
			direction: Direction.Left,
			next: 'b',
		},
		{
			write: 0,
			direction: Direction.Right,
			next: 'c',
		},
	],
	c: [
		{
			write: 1,
			direction: Direction.Left,
			next: 'c',
		},
		{
			write: 1,
			direction: Direction.Left,
			next: 'a',
		},
	],
}
