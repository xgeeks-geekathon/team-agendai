import { LockOpen, Map, Person, CalendarMonth, Grading } from '@mui/icons-material';

import { Dictionary } from '@shared/dictionary';

export const routes = {
  home: '/',
  onboarding: {
    path: '/onboarding',
    routes: {
      step: (stepNumber: string = ':stepNumber') => `/${stepNumber}`,
    },
  },
  profile: '/my-account',
  auth: {
    path: '/auth',
    routes: {
      login: '/login',
      signup: '/signup',
      resetPassword: '/reset-password',
      resetPasswordConfirm: '/reset-password-confirm',
      google: {
        path: '/google',
        routes: {
          callback: '/callback',
        },
      },
    },
  },
  boards: {
    path: '/boards',
    routes: {
      view: (boardId: string | number = ':boardId') => `/${boardId}`,
    },
  },
  events: {
    path: '/events',
    routes: {
      view: (eventId: string | number = ':eventId') => `/${eventId}`,
    },
  },
  tasks: {
    path: '/tasks',
    routes: {
      view: (taskId: string | number = ':taskId') => `/${taskId}`,
    },
  },
};

export const navigation = (router: MT.Routing.RecursiveRoutes<typeof routes>, dictionary: Dictionary): MT.Navigation.Config => ({
  userMenu: [{
    icon: <Person color="inherit"/>,
    text: dictionary.menu.users.myAccount,
    route: router.profile.path,
    requiresAuth: true,
  }, {
    icon: <LockOpen color="inherit"/>,
    text: dictionary.menu.auth.login,
    route: router.auth.login.path,
    requiresAuth: false,
  }, {
    icon: <LockOpen color="inherit"/>,
    text: dictionary.menu.auth.signUp,
    route: router.auth.signup.path,
    requiresAuth: false,
  }],
  sidebar: [{
    icon: <Map color="inherit"/>,
    text: dictionary.menu.dashboard,
    route: router.home.path,
    requiresAuth: true,
  }, {
    divider: true,
  }, {
    icon: <CalendarMonth color="inherit"/>,
    text: 'Events',
    route: router.events.path,
    requiresAuth: true,
  }, {
    icon: <Grading color="inherit"/>,
    text: dictionary.menu.board.list,
    route: router.boards.path,
    requiresAuth: true,
  }],
});
