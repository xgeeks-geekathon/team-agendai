import en from './languages/en';
import de from './languages/de';
import { routes } from './routes';

const config: MT.Config = {
  projectName: 'Agendai',
  featureFlags: {
    appleSSO: false,
    googleSSO: true,
    microsoftSSO: false,
    translations: false,
    notifications: false,
    search: true,
    darkMode: false,
  },
  theme: {
    defaultMode: 'light',
    drawerWidth: 240,
    disableRipple: true,
    elevation: 0,
  },
  language: {
    dictionaries: {
      en,
      de,
    },
    languageLabelMap: {
      en: 'English',
      de: 'Deutsche',
    },
    supportedLanguages: ['en', 'de'],
    defaultLanguage: 'en',
    defaultDictionary: en,
  },
  defaultPermissions: {
    users: {
      list: false,
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    boards: {
      list: false,
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    tasks: {
      list: false,
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
  },
  routes: routes,
  dialogs: ['createBoard', 'editBoard', 'viewTask'],
};

export const googleMapsApiKey =  import.meta.env.VITE__GOOGLE_MAPS_KEY;

export default config;
