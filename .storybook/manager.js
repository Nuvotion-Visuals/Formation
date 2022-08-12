import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'
import { FormationTheme } from './Formation.theme'

addons.setConfig({
  theme: FormationTheme,
});


import icon from '../icon.png';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', icon);
document.head.appendChild(link);