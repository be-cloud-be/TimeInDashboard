import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Revue Mensuelle',
    icon: 'month-review',
    link: '/pages/month-review',
    home: false,
  },
  {
    title: 'Détails Mensuelle',
    icon: 'month-details',
    link: '/pages/month-details',
    home: false,
  },
  {
    title: 'Revue annuelle',
    icon: 'year-details',
    link: '/pages/year-details',
    home: false,
  },
  {
    title: 'Analyse Chantiers',
    icon: 'analyse-chantier',
    link: '/pages/analyse-chantier',
    home: false,
  },
];
