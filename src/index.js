import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/fonts/Gilroy-Regular.otf';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Hotjar — only injected when REACT_APP_HOTJAR_ID is set at build time
const hjid = process.env.REACT_APP_HOTJAR_ID;
if (hjid) {
  (function (h, o, t, j, a, r) {
    h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
    h._hjSettings = { hjid: Number(hjid), hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

// Google Analytics — only injected when REACT_APP_GA_ID is set at build time
const gaId = process.env.REACT_APP_GA_ID;
if (gaId) {
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(gtagScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', gaId);
}

// JivoSite — only injected when REACT_APP_JIVO_ID is set at build time
const jivoId = process.env.REACT_APP_JIVO_ID;
if (jivoId) {
  const jivoScript = document.createElement('script');
  jivoScript.async = true;
  jivoScript.src = `//code.jivosite.com/widget/${jivoId}`;
  document.head.appendChild(jivoScript);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
