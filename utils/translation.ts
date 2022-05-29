import { Translations } from "types/types";

type LanguageToField = {
  pl?: string;
  ua?: string;
  en?: string;
};

const languageToFieldNameMap: LanguageToField = {
  pl: "pl",
  ua: "ua",
  en: "en",
};

export const getTranslation = (language: string, entry: Translations) => {
  const languageFieldName =
    languageToFieldNameMap[language as keyof LanguageToField];

  if (!entry) return "";

  return entry[languageFieldName as keyof Translations] || entry.pl;
};

export const mapTranslationKeys = (translations: any): Translations => ({
  ...translations,
  pl: translations["namePl"],
  en: translations["nameEn"],
  ua: translations['nameUa']
});