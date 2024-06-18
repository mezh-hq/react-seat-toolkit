
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandUrl: 'https://mezh-hq.github.io',
  brandTitle:  `<div style="display:flex;align-items:center;gap:6px;"><img src="./logo.jpg" style="border-radius:8px;" width="45px" height="45px"/><span>Mezh HQ | Seat Toolkit</span></div>`,
  brandTarget: '_self',
});