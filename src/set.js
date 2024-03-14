import get from "./get.js";

/**
 * Set the value of a property path on an object
 * TODO what happens when the path does not exist? a) create it, b) throw an error, c) return undefined
 * @param {object} obj
 * @param {(string | number | Symbol)[]} path
 * @param {any} value
 * @returns {any} The value that was set
 */
export default function set (obj, path, value) {
	let parentPath = path.slice();
	let lastKey = parentPath.pop();
	const parent = get(obj, parentPath);

	return parent && (parent[lastKey] = value);
}
