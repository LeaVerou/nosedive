import PathSegment from "./classes/PathSegment.js";
import { resolvePathSegment } from "./util.js";

export default function descend (object, pathSegment, o) {
	if (typeof pathSegment === "function") {
		// Dynamic path segment
		pathSegment = pathSegment.call(object, object, o);
		// TODO what if this returns an array intending to *extend* the path?
	}

	if (pathSegment === undefined || pathSegment === null) {
		// No-op
		return object;
	}

	// FIXME if literal wildcard property exists, this will just return that
	if (pathSegment in object) {
		return object[pathSegment];
	}

	pathSegment = new PathSegment(pathSegment);
	return pathSegment.get(object);
}












