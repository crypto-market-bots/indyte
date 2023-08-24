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
  ],
  dietitian: [
    {
      title: 'dashboard',
      path: '/dashboard/dietitian',
      icon: icon('ic_analytics'),
      // children: [
      //   {
      //     title: 'crm',
      //     path: '/dashboard/crm',
      //     icon: icon('ic_nested1'),
      //   },
      //   {
      //     title: 'dietitian',
      //     path: '/dashboard/dietitian',
      //     icon: icon('ic_nested2'),
      //   },
      // ],
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
      title: 'History',
      path: '/dashboard/history',
      icon: icon('ic_cart'),
    },
    {
      title: 'Progress Tracker',
      path: '/dashboard/progress-tracker',
      icon: icon('ic_cart'),
    },
    // {
    //   title: 'blog',
    //   path: '/dashboard/blog',
    //   icon: icon('ic_blog'),
    // },

    // {
    //   title: 'Not found',
    //   path: '/404',
    //   icon: icon('ic_disabled'),
    // },
  ],
};

export default navConfig;
