module.exports = {
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"],
  "globals": {
    "App":true,
    "Page":true,
    "Component":true,
    "Behavior":true,
    "wx":true,
    "getApp":true,
  },
  "rules": {
    "prettier/prettier": ["error"],
    "no-console": "off"
  }
};