import Predicate from "../classes/Predicate.js";

export default class StartsWithPredicate extends Predicate {
	testCaseSensitive (property) {
		return property.startsWith(this.value);
	}
}

Predicate.register("startsWith", StartsWithPredicate);