import { init, getLocaleFromNavigator, addMessages } from 'svelte-i18n';
import en from './locales/en.json'
import nlNL from './locales/nl-NL.json'

addMessages('en', en);
addMessages('nl-NL', nlNL);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator(),
});