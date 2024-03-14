import Predicate from "../classes/Predicate.js";

export default class RangePredicate extends Predicate {
	test (property) {
		let {from, to} = this.value;
		return property >= from && property <= to;
	}
}

Predicate.register("range", RangePredicate);