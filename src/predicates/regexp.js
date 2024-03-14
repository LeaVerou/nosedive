import Predicate from "../classes/Predicate.js";

export default class RegexpPredicate extends Predicate {
	setup () {
		if (this.value instanceof RegExp) {
			if (this.ignoreCase && !this.value.ignoreCase) {
				// Clone regexp so we can set the i flag
				this.value = new RegExp(this.value.source, value.flags + "i");
			}
		}

		return new RegExp(this.value, this.ignoreCase? "gi" : "g");
	}

	test (property) {
		return this.value.test(property);
	}
}

Predicate.register("regexp", RegexpPredicate);