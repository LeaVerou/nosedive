import * as predicates from "./predicates/index.js";
import PathSegment from "./classes/PathSegment.js";

export function getPath (value, parent) {
	value = Array.isArray(value)? value : [value];
	return value.map(v => new PathSegment(v, { parent }));
}

export function propagateIgnoreCase (path, value) {
	if (value === undefined) {
		return path;
	}

	for (let i=0; i<path.length; i++) {
		let segment = path[i];

		if (typeof segment === "string") {
			if (value) { // plain strings are case sensitive anyway
				path[i] = {
					name: segment,
					ignoreCase: value
				};
			}
		}
		else if (segment.ignoreCase === undefined) {
			segment.ignoreCase = value;
		}
	}
}

// Private metadta
const initialized = Symbol("initialized");
const property = Symbol("property");
const test = Symbol("test");

export function resolvePathSegment (pathSegment) {
	if (pathSegment?.[initialized]) {
		return;
	}

	let type = typeof pathSegment;

	// NOTE assuming pathSegment is not a function
	if (type !== "object") {
		// Literal matching or wildcard
		let ret = {
			[initialized]: true
		};

		if (pathSegment !== "*") {
			ret[property] = pathSegment;
		}

		return ret;
	}

	// Predicate object

	// Fast code path for literal matching
	if (pathSegment.name && !pathSegment.ignoreCase) {
		return {property: pathSegment.name};
	}

	// From this point on, lookups are O(N) at best
	let tests = [];

	for (let key in pathSegment) {
		let predicate = predicates[key];

		if (!predicate) {
			continue;
		}

		if (!pathSegment.initialized && predicate.setup) {
			predicate.setup.call(pathSegment, pathSegment[key]);
		}

		// Progressively filter properties with each predicate
		if (predicate?.test) {
			tests.push(predicate.test.bind(pathSegment, pathSegment[key]));
		}
	}

	pathSegment[initialized] = true;
	pathSegment[test] = property => tests.every(test => test(property));
}