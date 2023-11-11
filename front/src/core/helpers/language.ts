import config from '@shared/config';

export const getLanguageLabel = (language: MT.Language.SupportedLanguages): string => {
  return config.language.languageLabelMap[language];
};
