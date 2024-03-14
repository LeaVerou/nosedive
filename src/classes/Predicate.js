export default class Predicate {
	constructor (value, options) {
		this.value = value;
		this.parent = options?.parent;
		this.ignoreCase = options?.ignoreCase ?? this.parent?.ignoreCase;

		this.setup();
	}

	/**
	 * Separate so it can be overidden by subclasses
	 */
	setup () {
		if (this.ignoreCase && this.value?.toLowerCase) {
			this.value = this.value.toLowerCase();
		}
	}

	/**
	 * Test this predicate on a property
	 * @param {string | Symbol} property
	 * @param {*} object
	 */
	test (property, object) {
		if (this.ignoreCase && property.toLowerCase) {
			property = property.toLowerCase();
		}

		return this.testCaseSensitive(property, object);
	}

	testCaseSensitive (property, child) {
		return true;
	}

	toString () {
		return `${this.constructor.id}(${this.value})`
	}

	static types = {};

	/**
	 * Register an id for a class so it can be used in path segments
	 * @param {*} id
	 * @param {*} Class
	 */
	static register(id, Class) {
		Class.id ??= id;
		this.types[id] = Class;
	}

	static from (value) {
		if (value instanceof this) {
			return value;
		}

		if (value === "*") {
			return null;
		}

		if (typeof value === "string") {
			return this.from("name", value);
		}

		if (arguments.length === 2) {
			let [id, value] = arguments;

			if (id in this.types) {
				if (value.ignoreCase && id + "IgnoreCase" in this.types) {
					id += "IgnoreCase";
				}

				return new this.types[id](value);
			}
		}

		throw new TypeError("Invalid predicate value", ...arguments);
	}
}