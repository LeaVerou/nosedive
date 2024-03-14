import Predicate from "../classes/Predicate.js";
import PathSegment from "../classes/PathSegment.js";

export default class OrPredicate extends Predicate {
	setup () {
		this.value = this.value.map(v => PathSegment(v, { parent: this }));
	}

	test (property, object) {
		return this.value.every(v => v.test(property, object));
	}
}

Predicate.register("or", OrPredicate);