import Predicate from "../classes/Predicate.js";

export default class NamePredicate extends Predicate {
	test (property) {
		return property === this.value;
	}
}

Predicate.register("name", NamePredicate);
