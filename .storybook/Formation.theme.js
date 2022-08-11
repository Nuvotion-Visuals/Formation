import { create } from '@storybook/theming'

import logo from '../logo-white.svg'

export const FormationTheme = create({
  base: 'dark',

  colorPrimary: 'white',
  colorSecondary: 'hsl(0, 0%, 30%)',

  // UI
  appBg: 'hsl(0, 0%, 10%)',
  appContentBg: 'hsl(0, 0%, 10%)',
  appBorderColor: 'hsl(0, 0%, 20%)',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'white',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'hsl(0, 0%, 10%)',
  barBg: 'hsl(0, 0%, 10%)',

  // Form colors
  inputBg: 'hsl(0, 0%, 10%)',
  inputBorder: 'hsl(0, 0%, 16%)',
  inputTextColor: 'white',
  inputBorderRadius: 4,

  brandTitle: 'Formation',
  brandUrl: 'https://avsync-live.github.io/formation',
  brandImage: logo,
  brandTarget: '_self',
})