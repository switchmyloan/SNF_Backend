/**
 * Create an object composed of the picked object properties.
 * @function pick
 *
 * @param object - The source object to pick properties from.
 * @param keys - The array of property names to pick from the source object.
 * @returns New object with only the picked properties.
 */
export const pick = <T extends object, K extends keyof T>(
	object: T,
	keys: K[]
): Pick<T, K> => {
	return keys.reduce(
		(result, key) => {
			// Check if the object has the specified property
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				result[key] = object[key]; // Assign the property to the result object
			}
			return result;
		},
		{} as Pick<T, K>
	); // Type the accumulator as Pick<T, K>
};
