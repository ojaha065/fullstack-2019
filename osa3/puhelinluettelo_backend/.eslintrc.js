module.exports = {
	"env": {
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"quotes": [
			"warn",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"arrow-spacing": [
			"error",
			{
				"before": true,
				"after": true
			}
		],
		"no-console": 0
	}
};