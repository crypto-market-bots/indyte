// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

var navConfig = {
  admin: [
    {
      title: 'dashboard',
      path: '/dashboard/crm',
      icon: icon('ic_analytics'),
    },

    {
      title: 'customer',
      path: '/dashboard/user/customer',
      icon: icon('ic_user'),
    },
    {
      title: 'dietitian',
      path: '/dashboard/user/dietitian',
      icon: icon('ic_user'),
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
      title: 'Templates',
      path: '/dashboard/templates',
      icon: icon('ic_cart'),
    },
  ],
  dietitian: [
    {
      title: 'dashboard',
      path: '/dashboard/dietitian',
      icon: icon('ic_analytics'),
    },
    {
      title: 'customer',
      path: '/dashboard/user/customer',
      icon: icon('ic_user'),
    },

    {
      title: 'Meal And Workout',
      path: '/dashboard/meal-workout',
      icon: icon('ic_cart'),
    },
    {
      title: 'Weight Tracker',
      path: '/dashboard/weight-tracker',
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
      title: 'Templates',
      path: '/dashboard/templates',
      icon: icon('ic_cart'),
    },
  ],
};

export default navConfig;
