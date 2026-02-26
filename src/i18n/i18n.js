import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import he from "./locales/he.json";
import nl from "./locales/nl.json";

// only these are supported
const supported = ["en", "fr", "he", "nl"];

function detectLang() {
  const nav = navigator.language?.toLowerCase() || "en"; // e.g. "en-US"
  const base = nav.split("-")[0]; // "en"
  return supported.includes(base) ? base : "en";
}

const initialLang = detectLang();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    he: { translation: he },
    nl: { translation: nl },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// set <html lang=""> and dir
function applyHtmlAttrs(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
}

applyHtmlAttrs(initialLang);

i18n.on("languageChanged", (lng) => {
  applyHtmlAttrs(lng);
});

export default i18n;
