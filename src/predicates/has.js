import { getPath } from "../util.js";
import has from "../../get.js";
import Predicate from "../classes/Predicate.js";

export default class HasPredicate extends Predicate {
	constructor (value, options) {
		super(value, options);

		// Value of has is a path
		this.value = getPath(value, this);
	}

	test (property, object) {
		return has(object[property], this.value);
	}
}

Predicate.register("has", HasPredicate);