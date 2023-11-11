import { Dictionary } from '@shared/dictionary';

export type ContextProps = {
  language: MT.Language.SupportedLanguages;
  setLanguage: (lang: MT.Language.SupportedLanguages) => void;
  dictionary: Dictionary;
};


