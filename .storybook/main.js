module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@etchteam/storybook-addon-css-variables-theme',
    '@storybook/addon-a11y',
    'storybook-addon-performance/register',
    '@etchteam/storybook-addon-status',
    'storybook-mobile'
  ],
  "framework": "@storybook/react",
}

module.exports = {
  staticDirs: ['./public'],
};