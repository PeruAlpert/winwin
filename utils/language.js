import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import en from './locales/en';
import ar from './locales/ar';

const locales = RNLocalize.getLocales();
console.log(RNLocalize.getLocales());
if (Array.isArray(locales)) {
  i18n.locale = locales[0].languageTag;
}

i18n.fallbacks = true;
i18n.translations = {
  en,
  ar,
};

// i18n.fallbacks = true;
// i18n.translations = {ar, en};
// i18n.locale = RNLocalize.locale;

export default i18n;
