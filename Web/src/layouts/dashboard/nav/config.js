// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    children: [
      {
        title: 'crm',
        path: '/dashboard/crm',
        icon: icon('ic_nested1'),
      },
      {
        title: 'dietitian',
        path: '/dashboard/dietitian',
        icon: icon('ic_nested2'),
      },
    ],
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    children: [
      {
        title: 'customer',
        path: '/dashboard/user/customer',
        icon: icon('ic_nested3'),
      },
      {
        title: 'dietitian',
        path: '/dashboard/user/dietitian',
        icon: icon('ic_nested4'),
      },
    ],
  },
  // {
  //   title: 'management',
  //   path: '/dashboard/management',
  //   icon: icon('ic_cart'),
  //   children: [
  //     {
  //       title: 'workout',
  //       path: '/dashboard/management/workout',
  //       icon: icon('ic_nested5'),
  //     },
  //     {
  //       title: 'meal',
  //       path: '/dashboard/management/meal',
  //       icon: icon('ic_nested6'),
  //     },
  //     {
  //       title: 'water',
  //       path: '/dashboard/management/water',
  //       icon: icon('ic_nested7'),
  //     },
  //   ],
  // },
  {
    title: 'Meal And Workout',
    path: '/dashboard/meal-workout',
    icon: icon('ic_cart'),
  },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: icon('ic_cart'),
  },
  {
    title: 'Progress Tracker',
    path: '/dashboard/progress-tracker',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
