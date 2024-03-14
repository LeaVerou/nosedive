import Predicate from "../classes/Predicate.js";

export default class EndsWithPredicate extends Predicate {
	testCaseSensitive (property) {
		return property.endsWith(this.value);
	}
}

Predicate.register("endsWith", EndsWithPredicate);