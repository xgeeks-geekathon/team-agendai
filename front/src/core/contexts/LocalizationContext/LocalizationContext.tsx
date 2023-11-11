import React from 'react';

import { Dictionary } from '@shared/dictionary';
import config from '@shared/config';

import { ContextProps } from './LocalizationContext.types';

const localStorageKey = `${import.meta.env.VITE__PROJECT_KEY}-language`;

const defaultContext: ContextProps = {
  language: config.language.defaultLanguage,
  dictionary: config.language.defaultDictionary,
  setLanguage: () => null,
};


const getLanguageFromLocalStorage = (): MT.Language.SupportedLanguages => {
  const lang = localStorage.getItem(localStorageKey) as MT.Language.SupportedLanguages || defaultContext.language;
  if(config.language.supportedLanguages.includes(lang)) {
    return lang;
  }
  return config.language.defaultLanguage;
};


export const LocalizationContext = React.createContext(defaultContext);

type Props = React.PropsWithChildren<{
  dictionaries: Record<MT.Language.SupportedLanguages, Dictionary>;
}>

export const LocalizationProvider: React.FC<Props> = ({ children, dictionaries }) => {

  const [language, setLanguage] = React.useState<MT.Language.SupportedLanguages>(getLanguageFromLocalStorage());
  const dictionary = dictionaries[language];


  React.useEffect(() => {
    localStorage.setItem(localStorageKey,language);
  },[language]);

  return (
    <LocalizationContext.Provider
      value={{
        dictionary,
        language,
        setLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const LocalizationConsumer = LocalizationContext.Consumer;
