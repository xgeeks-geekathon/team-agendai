import { isBrave, isChrome, isEdge, isFirefox, isOpera, isSafari, isSamsung } from './environment';

export const BROWSER_LOGOS = {
  chrome: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/chrome/chrome_48x48.png',
  brave: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/brave/brave_48x48.png',
  edge: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/edge/edge_48x48.png',
  firefox: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/firefox/firefox_48x48.png',
  opera: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/opera/opera_48x48.png',
  safari: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/safari/safari_48x48.png',
  samsung: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/samsung-internet/samsung-internet_48x48.png',
  web: 'https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/web/web.png',
};


export const getBrowserLogo = () => {
  if (isChrome) {
    return BROWSER_LOGOS.chrome;
  }
  if (isBrave) {
    return BROWSER_LOGOS.brave;
  }
  if (isEdge) {
    return BROWSER_LOGOS.edge;
  }
  if (isFirefox) {
    return BROWSER_LOGOS.firefox;
  }
  if (isOpera) {
    return BROWSER_LOGOS.opera;
  }
  if (isSafari) {
    return BROWSER_LOGOS.safari;
  }
  if (isSamsung) {
    return BROWSER_LOGOS.samsung;
  }
  return BROWSER_LOGOS.web;
};
