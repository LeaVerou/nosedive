import { check } from "htest.dev/check";
import get from "../src/get.js";

let obj1 = {
	a: {
		b: {
			c: 1
		}
	},
	arr: [
		{b: 2},
		{b: 3},
		{b: 4}
	]
};

export default {
	check: check.deep,
	run: get,
	tests: [
		{
			args: [obj1, ["a", "b", "c"]],
			expect: 1
		}
	]
}
