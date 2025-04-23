/* eslint-disable @typescript-eslint/no-explicit-any */
/* local storage related all method will resides here. */

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
}
export function setInLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function removeFromLocalStorage(key: string) {
  return localStorage.removeItem(key);
}

/* Storage key constants will be resides here */

export const STORAGE_KEY = {
  AUTH_TOKEN: 'auth.token',
  REFRESH_TOKEN: 'refresh.token',

  BOOSTER: {
    AUTH_TOKEN: 'booster.auth.token',
    REFRESH_TOKEN: 'booster.refresh.token',
    ACCOUNT_ID: 'booster.account.id',
  },
  CONFIG: {},
  MYCARE: {
    AUTH_TOKEN: 'mycare.auth.token',
    REFRESH_TOKEN: 'mycare.refresh.token',
    ACCOUNT_ID: 'mycare.account.id',
  },
  PCM: {
    AUTH_TOKEN: 'pcm.auth.token',
    REFRESH_TOKEN: 'pcm.refresh.token',
    ACCOUNT_ID: 'pcm.account.id',
  },
  POS: {
    AUTH_TOKEN: 'pos.auth.token',
    REFRESH_TOKEN: 'pos.refresh.token',
    ACCOUNT_ID: 'pos.account.id',
    APP_VERSION: 'pos.app.version',
    TILL_FILTER_PARAMS: 'pos.till.filter.params',
  },
  WHOLESALER: {
    AUTH_TOKEN: 'wholsaler.auth.token',
    REFRESH_TOKEN: 'wholsaler.refresh.token',
  },
  WADMIN: {
    AUTH_TOKEN: 'wholsaler.auth.token',
    REFRESH_TOKEN: 'wholsaler.refresh.token',
  },
  EBILL: {
    AUTH_TOKEN: 'ebill.auth.token',
    REFRESH_TOKEN: 'ebill.refresh.token',
  },
};
