// we are using babel.config.js because this is the only config format that supports
// monorepo for now
// another one thing babel-node should be executed only from root directory
// e.g. babel-node packages/../..
// @see https://babeljs.io/docs/en/config-files#monorepos

const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
  ],
};

module.exports = config;
