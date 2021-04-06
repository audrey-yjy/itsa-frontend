import '../styles/globals.css'

import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export function reportWebVitals(metric) {
  if (metric.label==="custom") {
    console.log(metric);
  }
}

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  ) 
}
