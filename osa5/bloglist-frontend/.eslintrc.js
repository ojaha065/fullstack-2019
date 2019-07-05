module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest/globals": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		"ecmaFeatures": {
            "jsx": true
        }
	},
	"plugins": [
		"react",
		"jest",
		"react-hooks"
	],
	"settings": {
		"react": {
			"version": "detect"
		}
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
		"eqeqeq": "warn",
		"no-trailing-spaces": "warn",
		"no-unused-vars": "warn",
		"arrow-spacing": [
			"error",
			{
				"before": true,
				"after": true
			}
		],
		"no-console": 0,
		"react/prop-types": 0,
		"react-hooks/rules-of-hooks": "error"
	}
};