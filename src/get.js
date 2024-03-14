/**
 * Get the value of a property path from an object
 * @param {object} obj
 * @param {(string | number | Symbol)[]} path
 * @returns {any} The value of the property at the given path (or `undefined` if the path does not exist)
 */
// export default function get (obj, path) {
// 	return path.reduce((acc, key) => acc?.[key], obj);
// }

import descend from "./descend.js";

export default function get (obj, path) {
	let acc = obj;
	for (let key of path) {
		// How to distinguish arrays of arrays from multiple values returned?
		if (Array.isArray(acc)) {
			acc = acc.flatMap(item => descend(item, key));
		}
		else {
			acc = descend(acc, key);
		}
	}

	return acc;
}