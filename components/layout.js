import { useRouter } from 'next/router';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { format } from 'date-fns';
import { BiMoon, BiSearch, BiArrowBack, BiLock } from 'react-icons/bi';


export const siteTitle = 'ITSA Group 6'

export default function Layout({ children, home, searchQuery }) {
  const router = useRouter();
  const [query, setQuery] = useState();

  useEffect(() => {
    if (localStorage.getItem("searchQuery")) {
      setQuery(JSON.parse(localStorage.getItem("searchQuery")));
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {router.pathname.startsWith("/hotels/checkout") || router.pathname.startsWith("/hotels/confirmation")  ? (
          <div className={utilStyles.searchBar} style={{width: "100%", height: 36, backgroundColor: "#00153A"}}>
            {router.pathname.startsWith("/hotels/checkout") ? (
              <div style={{width:"65%", zIndex: 2, paddingLeft: "100px", color: "#FFFFFF", fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>
                <span><BiArrowBack /> Back</span>
                <span>SSL secured & encrypted check-out <BiLock /></span>
              </div>
            ) : null }
          </div>
        ) : null }
      </header>

      {router.pathname.startsWith("/hotels/detail") || router.pathname.startsWith("/results") ? (
        <div className={utilStyles.searchBar}>
          <div style={{width:"65%"}}>
            <Card>
              <Card.Grid hoverable={false} className={utilStyles.searchBarSection} style={{width: "15%", flexDirection: "row", justifyContent: "flex-end"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <span style={{fontSize: 25, color: "#E52E2E", lineHeight: "25px"}}>{router.pathname.startsWith("/results") ? <BiSearch/> : <BiArrowBack />}</span>
                  <span>{router.pathname.startsWith("/results") ? "Edit" : "Back"}</span>
                </div>
              </Card.Grid>

              <Card.Grid hoverable={false} className={utilStyles.searchBarSection} style={{width: "25%", textAlign: "left"}}>
                <span className={utilStyles.searchBarTitle}>Destination</span>
                <span className={utilStyles.searchBarText}>{query ? query.country : "Singapore"}</span>
              </Card.Grid>

              <Card.Grid hoverable={false} className={utilStyles.searchBarSection} style={{width: "25%", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                  <span className={utilStyles.searchBarTitle}>Check In</span>
                  <span className={utilStyles.searchBarText}>{query ? format(new Date(query.checkin), "d MMMM y") : ""}</span>
                </div>
                <div style={{width: 30, height: 30, borderRadius: "50%", backgroundColor: "#00153A", display: "flex", flexDirection: "column", alignSelf: "center", justifyContent: "center", textAlign: "center"}}>
                  <span style={{fontSize: 10, color: "#FFFFFF"}}>1<BiMoon /></span>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                  <span className={utilStyles.searchBarTitle}>Check Out</span>
                  <span className={utilStyles.searchBarText}>{query ? format(new Date(query.checkout), "d MMMM y") : ""}</span>
                </div>
              </Card.Grid>
              
              <Card.Grid hoverable={false} className={utilStyles.searchBarSection} style={{width: "10%"}}>
                <span className={utilStyles.searchBarTitle}>Rooms</span>
                <span className={utilStyles.searchBarText}>1</span>
              </Card.Grid>

              <Card.Grid hoverable={false} className={utilStyles.searchBarSection} style={{width: "10%"}}>
                <span className={utilStyles.searchBarTitle}>Guests</span>
                <span className={utilStyles.searchBarText}>{query ? query.numAdult : 0} adult</span>
                {query && query.numChildren > 0 ? (<span className={utilStyles.searchBarText}>{query.numChildren} children</span>) : null}
              </Card.Grid>

              <Card.Grid hoverable={false} className={utilStyles.searchBarSection} style={{width: "15%"}}>
                <span className={utilStyles.searchBarTitle}>Partner</span>
                <span className={utilStyles.searchBarText}>SIA</span>
              </Card.Grid>
            </Card>
          </div>
        </div>
      ) : (
        null
      )}
      
      
      <main className={styles.main}>
        {router.pathname.startsWith("/hotels/detail") || router.pathname.startsWith("/results") ? (
          <div style={{width: "100%", height: 240, backgroundColor: "#00153A"}}></div>
        ) : (
          null
        )}
        {children}
      </main>
    </div>
  )
}