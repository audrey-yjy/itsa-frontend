import '../styles/globals.css'
import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';

import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";

// import { Amplify } from "aws-amplify";
// import awsExports from "../src/aws-exports";
// Amplify.configure({ ...awsExports, ssr: true });


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
    <>
    <header style={{backgroundColor: "#FFFFFF"}}>
      <div style={{width:"65%", height: "20%", margin: "0 auto", display: "flex", flexDirection: "row", justifyContent: "flex-end", position: "relative"}}>
        <div style={{width: 80, height: 90, backgroundColor: "#E52E2E", position: "absolute", top: 0, left: 0, zIndex: 1}}>
        </div>
        <span className={utilStyles.headerBlock}>EN_US</span>
        <span className={utilStyles.headerBlock}>SGD</span>
        <span className={utilStyles.headerBlock}>Login/Signup</span>
      </div>
    </header>

    <Component {...pageProps} />
    </>
  ) 
}
