import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Month Review',
    icon: 'month-review',
    link: '/pages/month-review',
    home: false,
  },
  {
    title: 'Month Details',
    icon: 'month-details',
    link: '/pages/month-details',
    home: false,
  },
];
