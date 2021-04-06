import React from "react"
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from "react"
import Date_Picker from "./components/DatePicker"
import SelectList from "./components/Select"
import Footer from "./components/Footer"
import Layout from '../components/layout';
import styles from "../styles/components/HomePage.module.css"
import { Row, Col, Button } from 'antd'
import "react-datepicker/dist/react-datepicker.css"


export default function Home() {
  const router = useRouter();

  const searchRef = useRef(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(false)
  const [filteredResults, setFilteredResults] = useState([])
  const [uid, setUID] = useState("WDOM")
  const [full_name, setFullName] = useState("")
  const audltRef = React.createRef

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    setActive(true)

    const searchEndpoint = `https://ojf2x5bl5bdr7e2czg4f6ogeua.appsync-api.ap-southeast-1.amazonaws.com/graphql`
    fetch(searchEndpoint,{
      method: "POST",
      headers: {
        "x-api-key": "da2-juw2jskguzdjdndcrxmhscl634",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: '{\n  destination(full_name: "' + query + '", size: "8") {\n    uid\n    full_name\n  }\n}\n'
      })
    }).then(res => res.json()).then(function (data) {
      var destinationsResult = data.data.destination
      setFilteredResults(destinationsResult)
      // console.log(filteredResults)
    })
  })

  const search = () => {
    const searchQuery = {
      "dest_id": uid,
      "checkin": checkIn,
      "checkout": checkOut,
      "lang": "en_US",
      "currency": "SGD",
      "country": "Singapore",
      "numAdult": parseInt(adult),
      "numChildren": parseInt(children),
      "guest": parseInt(adult) + parseInt(children)
    }
    
    router.push({
      pathname: "/results",
      query: searchQuery
    });

    localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  };

  const onFocus = useCallback(() =>{
      setActive(true)
  }, [])

  const saveName = useCallback((event) => {
      setActive(false)
      setQuery(event.currentTarget.innerText)
      setUID(event.currentTarget.getAttribute("value"))
  })

  const saveCheckin = (values) =>{
      setCheckin(values) 
      // console.log(checkin);
      // console.log(checkin);
  }

  const [checkIn, setCheckin] = useState("2021-05-18")
  const onChange4 = useCallback((event) => {
      setCheckin(event.target.value)
      // console.log(saveCheckin)
  })

  const [checkOut, setCheckOut] = useState("2021-05-19")
  const onChange5 = useCallback((event) => {
      setCheckOut(event.target.value)
      // console.log(saveCheckOut)
  })

  const [adult, setAdult] = useState(1)
  const onChange1 = useCallback((event) => {
      // console.log(event.target.value)
      setVal(event.target.value)
      // console.log(val)
      // console.log("Working")
  })

  var guest = 0;

  const onChange2 = useCallback((event) => {
      // console.log(event.target.value)
      setAdult(event.target.value)
      // console.log(adult)
      guest = parseInt(adult) + parseInt(children)
  })

  const [children, setChildren] = useState(0)
  const onChange3 = useCallback((event) => {
      // console.log(event.target.value)
      setChildren(event.target.value)
      // console.log(children)
      guest = parseInt(adult) + parseInt(children)
      // console.log(guest)
  })

  return (
    <Layout>
      <div style={{width: "100%", backgroundColor: "transparent"}}>
          <div className={styles.ascenda}>
            <div className = {styles.maxSize}>
              <h2 className={styles.mainBigText}>
                550,000 Hotels.
                <br></br>
                Incredible
                <br></br>
                Rewards.
              </h2>
              <div className={styles.searchForm}>
                <div>
                  <h3 className= {styles.searchTop}>Preferred Loyalty Program</h3>
                  <div className={styles.imgContainer}>
                    <img src="/AeroFlot.png" className={ styles.partnerImg }></img>
                  </div>
                </div>
                <form name="mainSearch" className={styles.mainSearch} >
                  <Row style={{width: "100%"}}>
                    <Col span={24}>
                      <label className={styles.Headers}>Destination</label>
                      <input
                        placeholder="Destination" 
                        className={styles.Destination} 
                        id={uid}
                        onChange={onChange}
                        onFocus = {onFocus}
                        value ={query}
                      ></input>
                      <div>
                        {active && query.length > 0 && (
                          <ul className={styles.results}>
                            {filteredResults.map(({country_code,full_name,lonlat,uid})=>(
                              <li >
                                <a value={uid} onClick={saveName}>{full_name}</a>
                              </li> 
                            ))}
                          </ul>
                        )} 
                      </div>
                    </Col>
                  </Row>  

                  <Row style={{width: "100%"}} gutter={16}>
                    <Col span={12}>
                      <label className={styles.Headers}>Check In</label>
                      <Date_Picker onChange={onChange4} className={styles.datePicker}/>
                    </Col>
                    <Col span={12}>
                      <label className={styles.Headers}>Check Out</label>
                      <Date_Picker onChange={onChange5} onChangeclassName={styles.datePicker}/>
                    </Col>
                  </Row>

                  <Row style={{width: "100%"}} gutter={16}>
                    <Col span={8}>
                      <div>
                        <label className={styles.Headers}>Rooms</label>
                        <SelectList onChange={onChange1}/>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        <label className={styles.Headers}>Adults</label>
                        <select className="browser-default custom-select" onChange={onChange2} value={adult}>
                          <option value="0" >0 </option>
                          <option value="1" >1</option>
                          <option value="2" >2</option>
                          <option value="3" >3</option>
                          <option value="4" >4</option>
                        </select>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        <label className={styles.Headers}>Children</label>
                        <select className="browser-default custom-select" onChange={onChange3} value={children}>
                          <option value="0" >0 </option>
                          <option value="1" >1</option>
                          <option value="2" >2</option>
                          <option value="3" >3</option>
                          <option value="4" >4</option>
                        </select>
                      </div>
                    </Col>
                  </Row>

                  <Row style={{width: "100%"}}>
                    <Button style={{width:"75%", margin: "0 auto", marginTop: "25px"}} type="primary" onClick={() => search()}><b>SEARCH HOTELS</b></Button>
                  </Row>
                </form>
              </div>
            </div>
        </div>

        <div style={{width: "65%", height: "auto", marginBottom: "50px", margin: "0 auto"}}>
          <div className={styles.howItWorks}>How it works</div>
          <div className={styles.educationInfo}>
            <div className={styles.info}>
              <img src="https://cdn-s3.kaligo.com/assets/images/icons/20170707_Edu_Select.png"/>
              <div className={styles.description} translate="edu.select">Select program</div>
              <div className={styles.bottomDes} translate="edu.select_promote_info">Choose your preferred loyalty program from our 50+ renowned partners.</div>
            </div>
            <div className={styles.info}>
            <img src="https://cdn-s3.kaligo.com/assets/images/icons/20170707_Edu_Book.png"/>
              <div className={styles.description} translate="edu.select">Book Hotel</div>
              <div className={styles.bottomDes} translate="edu.select_promote_info">Book your favourite hotel by choosing from over 550,000 properties worldwide.</div>
            </div>
            <div className={styles.info}>
              <img src="https://cdn-s3.kaligo.com/assets/images/icons/20170707_Edu_Earn.png"/>
              <div className={styles.description} translate="edu.select">Reward Yourself</div>
              <div className={styles.bottomDes} translate="edu.select_promote_info">Earn thousands of miles/points per night and treat yourself to free travel rewards!</div>
            </div> 
          </div>
        </div> 
      </div> 
      <Footer/> 
    </Layout> 
  )
}