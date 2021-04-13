/**
 * Starts the currying of a UUID generation.
 * @returns {Function} The curried function.
 */
function uuid() {
	const opts = {
		characters: "1234567890abcdef".split(""),
		groups: [],
		separator: "",
	};

	const runAction = (action, ...values) => {
		const actions = [];
		/**
		 * Defines an action.
		 * @param {string} newAction The new action to define.
		 * @returns {string} The action passed as input.
		 */
		function defineAction(newAction) {
			actions.push(newAction);
			return newAction;
		}

		/**
		 * Generates a UUID.
		 * @param {string} base The base string.
		 * @returns {string} The generated UUID.
		 */
		function generateUUID(base = "") {
			let groupIndex = 0;
			for (const group of opts.groups) {
				for (let index = 0; index < group; index++) {
					const additions = {
						get 14() {
							return "4";
						},
						get 19() {
							return "9";
						},
						get default() {
							return opts.characters[Math.floor(Math.random() * opts.characters.length)];
						},
					};
					base += additions[base.length] || additions.default;
				}
				if ((groupIndex += 1) !== opts.groups.length) {
					base += opts.separator;
				}
			}
			return base;
		}

		switch (action) {
			case defineAction("addGroup"):
				opts.groups.push(values[0]);
				break;
			case defineAction("setSeparator"):
				opts.separator = values[0];
				break;
			case defineAction("prepare"):
				return () => generateUUID();
			default:
				throw new Error("Invalid action. Valid actions are: " + actions.join(", "));
		}
		return runAction;
	};
	return runAction;
}
module.exports = uuid;
