import styles from "../../styles/components/Navbar.module.css"
import Image from "next/image"
import {Navbar, NavbarBrand} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";


export default function NavBar() {
  return(
      <div className={styles.tmTopBar} id="tm-top-bar">
  
          <div className={styles.container}>
              <div className={styles.row}>
                  
                  <Navbar expand="lg"  className={styles.navbar}>
                      <Navbar.Brand className={styles.navBarBrand}>
                           <img className={styles.ascendaImg} src="/Ascenda.jpg" alt="Site logo"/>
                          Ascenda Loyalty             
                      </Navbar.Brand>
                      <Navbar.Toggle className={styles.navBarToggler} data-toggle="collapse" data-target="#mainNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </Navbar.Toggle>
                      <Navbar.Collapse className={styles.mainNav} id="mainNav" class="collapse navbar-collapse tm-bg-white">
                          <ul className="navbar-nav ml-auto">
                            <li className={styles.navItem} class="nav-item" >
                              <a className="nav-link" href="#top">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li className={styles.navItem} class="nav-item" >
                              <a className="nav-link" href="#tm-section-4">Customer</a>
                            </li>
                            <li className={styles.navItem} class="nav-item" >
                              <a className="nav-link" href="#tm-section-5">Booking</a>
                            </li>
                            <li className={styles.navLogin} class="nav-item" >
                              <a className="nav-link" href="#tm-section-6"><Login/></a>
                              
                            </li>
                            <FontAwesomeIcon style={{margin:"auto"}} icon={faUser} />
                          </ul>
                      </Navbar.Collapse>                            
                  </Navbar>            
              </div>
          </div>
      </div>
  )
}