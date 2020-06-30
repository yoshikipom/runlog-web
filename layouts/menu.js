export default {
  items: [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Record',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Day',
      url: '/record/day',
      icon: 'icon-notebook'
    },
    {
      name: 'Week',
      url: '/record/week',
      icon: 'icon-notebook'
    },
    {
      name: 'Month',
      url: '/record/month',
      icon: 'icon-notebook'
    },
    {
      name: 'Year',
      url: '/record/year',
      icon: 'icon-notebook'
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star'
        }
      ]
    },
  ]
}
