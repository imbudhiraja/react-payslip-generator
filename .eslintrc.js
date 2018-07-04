module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        },
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/label-has-for":0,
        'no-alert':0,
        'react/no-unused-state':0,
        'consistent-return': 0
    },
    "env": {
        "es6": true,
        "mocha": true,
        "browser": true
      }
};