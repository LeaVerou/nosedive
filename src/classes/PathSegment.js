import Predicate from "./Predicate.js";
import * as predicates from "../predicates/index.js";

export default class PathSegment {
	constructor (spec) {
		if (spec instanceof this.constructor) {
			return spec;
		}

		let type = typeof spec;
		this.ignoreCase = spec.ignoreCase;
		this.predicates = [];

		// NOTE assuming pathSegment is not a function
		if (type === "string" || type === "number" || type === "symbol") {
			if (spec !== "*") {
				// Literal name matching
				this.name = spec;
			}
			// else nothing, we leave the predicates array empty
		}
		else {
			// Predicate object
			for (let key in spec) {
				let predicate = Predicate.from(key, spec[key]);

				if (predicate) {
					this[key] = predicate;
					this.predicates.push(predicate);
				}
			}
		}
	}

	test (property, object) {
		return this.predicates.every(p => p.test(property, object));
	}

	// No idea what I'm doing here
	has (property, object) {
		if (this.name) {
			return this.name in object[property];
		}

		if (this.predicates.length === 0) {
			for (let prop in object) {
				// Return true as long as object has at least one property
				return true;
			}

			return false;
		}
	}

	/**
	 * If this path segment can be resolved with a single property reference, return that property.
	 * Otherwise, return undefined.
	 * @returns { string | number | Symbol | undefined }
	 */
	get (object) {
		return this.name !== undefined ? object[this.name] : this.values();
	}

	entry (object) {
		if (this.name !== undefined) {
			return [this.name, object[this.name]];
		}

		if (this.predicates.length === 0) {
			for (let prop in object) {
				// Return first property found
				return [prop, object[prop]];
			}
		}

		return this.entries()[0];
	}

	entries (object) {
		if (this.name !== undefined) {
			return [this.name, object[this.name]];
		}

		let ret = Object.entries(object);

		if (this.predicates.length === 0) {
			return ret;
		}

		return ret.filter(([key, value]) => this.test(key, object));
	}

	value (object) {
		if (this.name !== undefined) {
			return object[this.name];
		}

		if (this.predicates.length === 0) {
			for (let prop in object) {
				// Return first property found
				return object[prop];
			}
		}
	}

	values (object) {
		return this.keys(object).map(key => object[key]);
	}

	key (object) {
		if (this.name !== undefined) {
			return this.name;
		}

		if (this.predicates.length === 0) {
			for (let prop in object) {
				// Return first property found
				return object[prop];
			}
		}

		return this.keys(object)[0];
	}

	keys (object) {
		if (this.name !== undefined) {
			return [this.name];
		}

		let ret = Object.keys(object);
		return ret.filter(key => this.test(key, object));
	}

	toString () {
		if (this.name) {
			return this.name;
		}

		if (this.predicates.length === 0) {
			return "*";
		}

		return this.predicates.map(p => p.toString()).join(" AND ");
	}
}