declare namespace MT {
  export interface Config {
    projectName: string;
    featureFlags: React<string, boolean>;
    theme: {
      defaultMode: PaletteMode;
      drawerWidth: number;
      disableRipple: boolean;
      elevation: number;
    },
    language: {
      dictionaries: Record<MT.Language.SupportedLanguages, any>;
      languageLabelMap: Record<MT.Language.SupportedLanguages, string>
      supportedLanguages: MT.Language.SupportedLanguages[];
      defaultLanguage: MT.Language.SupportedLanguages;
      defaultDictionary: any;
    },
    defaultPermissions: MT.Permission.Permissions;
    dialogs: MT.Dialogs.Dialog[];
    routes: MT.Routing.Config;
  }
};
