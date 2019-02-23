import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';

import en from './translations/en.json';
import de from './translations/de.json';

i18n.locale = RNLocalize.getLocales().languageCode;
i18n.fallbacks = true;
i18n.translations = { en, de };

export default i18n;