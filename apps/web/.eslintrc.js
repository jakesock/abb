const nextConfig = require("@abb/config/eslint-preset-next");

module.exports = {
  ...nextConfig,
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
