import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css'
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, List, Rate, Space, Button, Form, Input, Slider, Checkbox } from 'antd';


const Results = ({ hotelsData, priceData, searchQuery }) => {
  const router = useRouter();
  const [results, setResults] = useState();

  // For each hotel, map its lowest_price
  const findLowestPrice = (hotelId) => {
    const priceExists = priceData.some(obj => obj.id === hotelId);
    if (priceExists) {
      hotelsData.find(obj => obj.id === hotelId)["lowest_price"] = priceData.find(obj => obj.id === hotelId).lowest;
    } else {
      hotelsData.find(obj => obj.id === hotelId)["lowest_price"] = 0;
    }
    // console.log(hotelsData.find(obj => obj.id === hotelId));
  }
  hotelsData.map( (hotel) => findLowestPrice(hotel.id) );


  const bookDeal = (selectedHotel) => {
    // cache selected hotel's details
    localStorage.setItem("hotel", JSON.stringify(selectedHotel));
    console.log("SELECTED HOTEL", selectedHotel);
  }
 
  // CHECK IF DATA EXISTS IN CACHE
  useEffect(() => {
    const queryStr = localStorage.getItem("searchQuery") ? localStorage.getItem("searchQuery") : JSON.stringify(searchQuery);

    // cache hotelsData 
    if (localStorage.getItem("hotelsDataCache")) {
      // cache exists, check if cache hit
      const hotelsDataFromCache = JSON.parse(localStorage.getItem("hotelsDataCache"));
      const cacheExists = hotelsDataFromCache.some(obj => obj.query === queryStr);

      if (cacheExists) {
        setResults(hotelsDataFromCache.find(obj => obj.query === queryStr).data);
        console.log("CACHE HIT, current cache length: " + hotelsDataFromCache.length)
      } else {
        if (hotelsDataFromCache.length > 10) {
          console.log("CACHE MISS")
          // delete first cache entry
        }
        hotelsDataFromCache.push({query: queryStr, data: hotelsData});
        localStorage.setItem("hotelsDataCache", JSON.stringify(hotelsDataFromCache));
        console.log("CACHE ENTRY ADDED, current cache length: " + hotelsDataFromCache.length);
      }
    } else {
      // hotelsData doesn't exist, populate storage
      const hotelsDataCache = [{query: queryStr, data: hotelsData}]
      localStorage.setItem("hotelsDataCache", JSON.stringify(hotelsDataCache))
    }
  }, []);

  console.log("RESULTS: ", results);


  return (
    <>  
    <Layout>
      {/* NUM RESULTS */}
      <div className={utilStyles.mainContainer} style={{height: 100, display: "flex", flexDirection: "column", fontSize: 13, padding: "20px 0px", color: "#FFFFFF", top: 0}}>
        {hotelsData ? (
          <>
          <span style={{fontSize: 16}}>Showing 10 of {hotelsData.length} hotels</span>
          <span>Rates shown per room per night, inclusive of taxes & fees</span>
          <span>Rewards include applicable bonuses</span>
          </>
        ) : (
          "Loading"
        )}
        
      </div>

      <div className={utilStyles.mainContainer} style={{top: 100}}>
        <Row justify="space-between" gutter={16}>
          {/* SIDE FILTER */}
          <Col span={6}>
            <Card>
              <Space direction="vertical" size={20} style={{width: "100%"}}>
                <div>
                  map
                </div>

                <div>
                  <span className={utilStyles.searchBarTitle}>Hotel Name</span>
                  <Input placeholder="Search hotel name or brand" style={{fontSize: "13px"}} />
                </div>

                <div>
                  <span className={utilStyles.searchBarTitle}>Reviews Score</span>
                  <Slider range min={2} max={5} marks={{
                      2: '2',
                      5: {
                        style: { color: '#f50' },
                        label: <strong>5</strong>,
                      },
                    }} defaultValue={[2, 5]} />
                </div>

                <div>
                  <span className={utilStyles.searchBarTitle}>Price Range</span>
                  <Slider range min={43} max={6636} marks={{
                      43: "$43",
                      6636: "$6636",
                    }} defaultValue={[43, 6636]} />
                </div>

                <div>
                  <span className={utilStyles.searchBarTitle}>Hotel Star Rating</span>
                  <Checkbox.Group style={{width:"100%"}}>
                    <List
                      itemLayout={"vertical"}
                      split={false}
                      dataSource={[5,4,3,2,1]}
                      renderItem={item => (
                        <List.Item style={{padding: "0px"}}>
                          <Checkbox style={{ lineHeight: '32px' }}>
                            <Rate style={{fontSize: 14}} disabled defaultValue={item} />
                          </Checkbox>
                          <span style={{color: "#CCCCCC", float: "right", paddingTop: "5px"}}>50</span>
                        </List.Item>
                      )}
                    />
                  </Checkbox.Group>
                </div>

                <div>
                  <span className={utilStyles.searchBarTitle}>Hotel Popular for</span>
                  <Checkbox.Group style={{width:"100%"}}>
                    <List
                      itemLayout={"vertical"}
                      split={false}
                      dataSource={[
                        { label: 'Business Travellers', value: 'business_travellers' },
                        { label: 'Families', value: 'families' },
                        { label: 'Couples', value: 'couples' },
                        { label: 'Singles', value: 'singles' },
                      ]}
                      renderItem={item => (
                        <List.Item style={{padding: "0px"}}>
                          <Checkbox value={item.value} style={{ lineHeight: '32px' }}>
                            {item.label}
                          </Checkbox>
                        </List.Item>
                      )}
                    />
                  </Checkbox.Group>
                </div>
                <Button style={{width: "100%"}}>Reset</Button>
              </Space> 
            </Card>
          </Col>


          {/* SEARCH RESULTS */}
          <Col span={18}>
            <div>
            <List
              bordered={false}
              dataSource={hotelsData}
              renderItem={item => (
                <>
                {/* {console.log("Selected Hotel:", item)} */}
                <List.Item style={{padding: "0px"}}>
                  <Card
                    bordered={true}
                    style={{width: "100%", borderWidth: 0, borderBottomWidth: 3, borderColor: "#AAAAAA"}}
                  >
                    <Card.Grid hoverable={false} style={{width: "25%", height: "180px", textAlign: "center"}}>
                      <Image src="http://photos.hotelbeds.com/giata/bigger/36/365419/365419a_hb_ro_003.jpg" width={200} height={140} objectFit={"cover"} />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={{width: "50%", height: "180px", textAlign: "left"}}>
                      <h3 style={{fontSize: "20px"}}>{item.name}</h3>
                      <p>{item.address}</p>
                      <Rate style={{fontSize: 15}} disabled defaultValue={item.rating} />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={{width: "25%", height: "180px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "15px 20px"}}>
                      <span style={{fontSize: 15}}>Kaligo.com</span>
                      <span style={{fontSize: 18}}><span style={{fontSize: 12}}>{item.currency ? item.currency : "SGD"}</span> {item.lowest_price ? Number(item.lowest_price).toFixed(2) : 0}</span>
                      <span style={{fontSize: 12}}>Earn at least</span>
                      <span style={{fontSize: 18, color: "#FB9501"}}><b>{item.points ? item.points : 0}</b> <span style={{fontSize: 12, display: "inline"}}>miles</span></span>
                      <Link 
                        href={{
                          pathname: "/hotels/detail",
                          query: { 
                            hotel_id: item.id,
                            dest_id: item.dest_id,
                            checkin: searchQuery.checkin,
                            checkout: searchQuery.checkout,
                            lang: searchQuery.lang,
                            currency: searchQuery.currency,
                            country: searchQuery.country,
                            guest: searchQuery.guest
                          } // query parameters - destination, checkin, checkout, etc. 
                        }}
                      >
                        <Button type="primary" style={{width: "100%", alignSelf: "right"}} onClick={() => bookDeal(item)}>Book Deal</Button>
                      </Link>
                    </Card.Grid>
                  </Card>
                  
                </List.Item>
              </>
              )}
            />
            </div>
          </Col>      
        </Row>
      </div> 
    </Layout> 
    </>
  )
}


export async function getServerSideProps(context) {
  console.log(context.query);

  const API_URL =  "https://ojf2x5bl5bdr7e2czg4f6ogeua.appsync-api.ap-southeast-1.amazonaws.com/graphql";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "da2-juw2jskguzdjdndcrxmhscl634",
    "Cache-Control": "public"
  }
  const params = {
    size: 999, // NOTE: hardcode as large number for now
    dest_id: context.query.dest_id,
    checkin: context.query.checkin,
    checkout: context.query.checkout,
    lang: context.query.lang,
    currency: context.query.currency,
    country: context.query.country,
    numAdult: parseInt(context.query.numAdult),
    numChildren: parseInt(context.query.numChildren),
    guest: parseInt(context.query.guest),
  }

  // Hotel Static Data API
  const staticData = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      query: '{\n  hotel_detail(dest_id: "'+params.dest_id+'", size: "'+params.size+'") {\n    address\n    dest_id\n    id\n    name\n    rating\n  }\n}\n'
    })    
  }).then(res=>res.json()).catch((error) => {console.log(error)})
  
  // Hotel Lowest Price API
  const priceData = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      query: '{\n    hotels (id: "'+params.dest_id+'", checkin: "'+params.checkin+'", checkout: "'+params.checkout+'", lang: "'+params.lang+'", currency: "'+params.currency+'", country: "'+params.country+'", guest: "'+params.guest+'"){\n      id,\n      lowest\n  }\n}\n',
      variables: null,
      operationName: null
    })
  }).then(res=>res.json()).catch((error) => {console.log(error)})


  // pass data to the page via props
  return {
    props: { hotelsData: staticData.data.hotel_detail, priceData: priceData.data.hotels, searchQuery: context.query },
  }
}


export default Results;