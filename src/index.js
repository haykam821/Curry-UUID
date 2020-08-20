function uuid() {
	const opts = {
		characters: "1234567890abcdef".split(""),
		groups: [],
		separator: "",
	};

	const runAction = (action, ...values) => {
		const actions = [];
		function defineAction(action) {
			actions.push(action);
			return action;
		}

		switch (action) {
			case defineAction("addGroup"):
				opts.groups.push(values[0]);
				break;
			case defineAction("setSeparator"):
				opts.separator = values[0];
				break;
			case defineAction("prepare"):
				const generateUUID = (base = "") => {
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
								}
							}
							base += additions[base.length] || additions.default;
						}
						if ((groupIndex += 1) !== opts.groups.length) {
							base += opts.separator;
						}
					}
					return base;
				};
				return () => generateUUID();
			default:
				throw new Error("Invalid action. Valid actions are: " + actions.join(", "));
		}
		return runAction;
	};
	return runAction;
}
module.exports = uuid;