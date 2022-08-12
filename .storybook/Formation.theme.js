import { create } from '@storybook/theming'

import logo from '../logo-white.svg'

export const FormationTheme = create({
  base: 'dark',

  colorPrimary: 'rgba(255,255,255,0.9)',
  colorSecondary: 'hsl(0, 0%, 34%)',

  // UI
  appBg: 'hsl(0, 0%, 10%)',
  appContentBg: 'hsl(0, 0%, 10%)',
  appBorderColor: 'hsl(0, 0%, 34%)',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'rgba(255,255,255,0.9)',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'rgba(255,255,255,0.9)',
  barSelectedColor: 'rgba(255,255,255,0.9)',
  barBg: 'hsl(0, 0%, 10%)',

  // Form colors
  inputBg: 'hsl(0, 0%, 10%)',
  inputBorder: 'hsl(0, 0%, 24%)',
  inputTextColor: 'rgba(255,255,255,0.9)',
  inputBorderRadius: 4,

  brandTitle: 'Formation',
  brandUrl: 'https://avsync-live.github.io/formation',
  brandImage: logo,
  brandTarget: '_self',
})