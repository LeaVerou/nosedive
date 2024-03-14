import Predicate from "../classes/Predicate.js";

export default class NameIgnoreCasePredicate extends Predicate {
	testCaseSensitive (property) {
		return property === this.value;
	}
}

Predicate.register("nameIgnoreCase", NameIgnoreCasePredicate);