/* eslint-env mocha */

const { assert } = require("chai");
const isUUID = require("is-uuid");

const curryUUID = require(".");

describe("UUID generation", () => {
	it("generates valid UUIDs", () => {
		const generateUUID = curryUUID()
			("addGroup", 8)
			("addGroup", 4)
			("addGroup", 4)
			("addGroup", 4)
			("addGroup", 12)
			("setSeparator", "-")
			("prepare");

		for (let index = 0; index < 100; index++) {
			const uuid = generateUUID();
			assert.isTrue(isUUID.anyNonNil(uuid), `UUID '${uuid}' at ${index} is not a UUID`);
		}
	});

	it("throws an error when an invalid action is used", () => {
		assert.throws(() => {
			curryUUID()("invalidAction");
		}, Error);
	})
});