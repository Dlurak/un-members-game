/**
 * Shuffles an array without mutating the original array.
 */
export const shuffle = <T>(arr: T[]) => {
	const copy = [...arr];
	const result: T[] = [];

	while (copy.length) {
		const randomIndex = Math.floor(Math.random() * copy.length);
		result.push(copy[randomIndex]);
		copy.splice(randomIndex, 1);
	}

	return result;
}
