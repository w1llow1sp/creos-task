import { makeAutoObservable } from 'mobx';

class LocaleStore {
    locale: 'en' | 'ru' = 'en';

    constructor() {
        makeAutoObservable(this);
    }

    setLocale(locale: 'en' | 'ru') {
        this.locale = locale;
    }
}

const localeStore = new LocaleStore();
export default localeStore;
