import * as check from "htest.dev/check";
import get from "../src/get.js";

let obj1 = {
	a: {
		b: {
			c: 1
		},
		d: 5
	},
	arr: [
		{b: 2},
		{b: 3},
		{b: 4}
	]
};

export default {
	// check: check.deep,
	run(path) {
		return get(this.data.obj, path);
	},
	data: {
		obj: obj1
	},
	tests: [
		{
			name: "Path is a single string",
			arg: ["a"],
			expect: obj1.a
		},
		{
			name: "Nested path of static properties",
			arg: ["a", "b", "c"],
			expect: obj1.a.b.c
		},
		{
			arg: ["arr", "b"],
			expect: [2, 3, 4]
		},
		{
			name: "Wildcard",
			arg: ["a", "*"],
			expect: [
				obj1.a.b,
				obj1.a.d
			]
		},
		{
			name: "Literal property name as object",
			arg: [{name: "a"}],
			expect: obj1.a
		},
		{
			name: "Literal wildcard",
			arg: [{name: "*"}],
			data: {
				obj: {"*": 1, a: 2}
			},
			expect: 1,
		}
	]
}
