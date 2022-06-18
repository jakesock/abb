const nodeConfig = require("@abb/config/eslint-preset-node");

module.exports = {
  ...nodeConfig,
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
