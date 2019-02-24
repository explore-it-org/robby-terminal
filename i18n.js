import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';

import en from './translations/en.json';
import de from './translations/de.json';

i18n.translations = { en, de };
i18n.fallbacks = false;

const fallback = { languageTag: "en", isRTL: false };
const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;

I18nManager.forceRTL(isRTL); // optional, you might not want to handle RTL
i18n.locale = languageTag;

export default i18n;