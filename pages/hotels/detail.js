import Link from 'next/link';
// import Image from 'next/image';
import Imgix from "react-imgix";
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css'
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Divider, Button, List, Rate } from 'antd';
import ReactHtmlParser from 'react-html-parser';


const fakeHotelData = {
  id: "diH7",
  imageCount: 56,
  latitude: 1.28624,
  longitude: 103.852889,
  name: "The Fullerton Hotel Singapore",
  address: "1 Fullerton Square",
  address1: "1 Fullerton Square",
  rating: 5,
  trustyou: {
    id: "8e3920e5-46c6-4a1c-b21d-bc67463c2186",
    score: {
      overall: 90,
      kaligo_overall: 4.5,
      solo: 85,
      couple: 90,
      family: 92,
      business: 90
      }
    },
  categories: {
    overall: {
      name: "Overall",
      score: 90,
      popularity: 5
    },
    lake_hotel: {
      name: "Lake Hotel",
      score: 69,
      popularity: 1.9934110367893
    },
    business_hotel: {
      name: "Business Hotel",
      score: 97,
      popularity: 2.9867220735786
    },
    city_hotel: {
      name: "City Hotel",
      score: 88,
      popularity: 3.98003311036789
    }
  },
  amenities_ratings: [
    {
      name: "Location",
      score: 96
    },
    {
      name: "Wellness",
      score: 95
    },
    {
      name: "Service",
      score: 91
    },
    {
      name: "WiFi",
      score: 87
    },
    {
      name: "Vibe",
      score: 86
    },
    {
      name: "Breakfast",
      score: 84
    },
    {
      name: "Amenities",
      score: 81
    },
    {
      name: "Food",
      score: 80
    },
    {
      name: "Room",
      score: 77
    },
    {
      name: "Comfort",
      score: 62
    }
  ],
  description: "<p><b>Property Location</b> <br />With a stay at The Fullerton Hotel Singapore, you'll be centrally located in Singapore, steps from Cavenagh Bridge and Anderson Bridge. This 5-star hotel is close to Chinatown Heritage Center and <b>Universal Studios Singapore</b>®.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 400 individually furnished guestrooms, featuring refrigerators and plasma televisions. Complimentary wired and wireless Internet access keeps you connected, and satellite programming provides entertainment. Private bathrooms with separate bathtubs and showers feature deep soaking bathtubs and complimentary toiletries. Conveniences include phones, as well as laptop-compatible safes and desks.</p><p><b>Amenities</b> <br />Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool and a fitness center. This Colonial hotel also features complimentary wireless Internet access, concierge services, and gift shops/newsstands. Guests can get to nearby shops on the complimentary shuttle.</p><p><b>Dining</b> <br />Grab a bite at one of the hotel's 5 restaurants, or stay in and take advantage of 24-hour room service. Quench your thirst with your favorite drink at a bar/lounge. Buffet breakfasts are available for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include complimentary high-speed (wired) Internet access, a 24-hour business center, and limo/town car service. Planning an event in Singapore? This hotel has 7524 square feet (699 square meters) of space consisting of a conference center and meeting rooms. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and free self parking is available onsite.</p>",
  amenities: {
    airConditioning: true,
    businessCenter: true,
    clothingIron: true,
    dataPorts: true,
    dryCleaning: true,
    hairDryer: true,
    meetingRooms: true,
    outdoorPool: true,
    parkingGarage: true,
    roomService: true,
    safe: true,
    tVInRoom: true,
    voiceMail: true
  },
  original_metadata: {
    name: null,
    city: "Singapore",
    state: null,
    country: "SG"
  },
  image_details: {
    suffix: ".jpg",
    count: 56,
    prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/"
  },
  hires_image_index: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55",
  number_of_images: 76,
  default_image_index: 1,
  imgix_url: "https://kaligo-web-expedia.imgix.net",
  cloudflare_image_url: "https://www.kaligo-staging.xyz/images/new"
}


const Detail = ({ roomData, searchQuery }) => {
  const [hotel, setHotel] = useState();
  const [hotelImages, setHotelImages] = useState();

  // group rooms based on room type
  const groupedRoomData = Object.fromEntries(
    roomData.reduce(
    (entryMap, e) => entryMap.set(e.description, [...entryMap.get(e.description)||[], e]),
    new Map())
  );

  // returns an image for each room
  const getRoomTypeImage = (roomsArr) => {
    for (var i=0; i<roomsArr.length; i++) {
      if ((roomsArr[i].images != null) && (roomsArr[i].images.length > 0)) {
        const imageStr = roomsArr[i].images[0].split("=")[1];
        return imageStr.slice(0,-1);
      }
    }
    return null;
  }

  // returns an array of all images for the hotel 
  const getHotelImages = () => {
    const images = []
    for (var i=0; i<roomData.length; i++) {
      if ((roomData[i].images != null) && (roomData[i].images.length > 0)) {
        roomData[i].images.forEach((image) => {
          const imageStr = image.split("=")[1];
          images.push({url: imageStr.slice(0,-1)});
        });
      }
    }
    return images;
  }

  const bookRoom = (selectedRoom) => {
    // cache selected room's details
    localStorage.setItem("room", JSON.stringify(selectedRoom));
    console.log("SELECTED ROOM", selectedRoom);
  }

  useEffect(() => {
    // get hotel details from cache
    setHotel(localStorage.getItem("hotel") ? JSON.parse(localStorage.getItem("hotel")) : {name: "Loading", address: "Loading", rating: "0"});

    // get hotel images
    setHotelImages(getHotelImages());

    // load room price data
    // console.log("HOTEL id:", state.hotel.id + ", dest_id: " + state.hotel.dest_id);
    console.log("GROUPED ROOMS:", groupedRoomData);
    // console.log("ROOMS:", roomData);
  }, []);

  console.log("HOTEL IMAGES", hotelImages);


  return (
    <>
    <Layout>
      <div className={utilStyles.mainContainer} style={{top: 24}}>
        {/* HOTEL BASIC INFO */}
        <Card bordered={false} style={{marginBottom: "24px"}} bodyStyle={{padding: "0px"}}>
          <Row justify="space-between">
            <Col span={12}>
              <div style={{height: "100%", width: "100%"}}>
                <Imgix src="http://photos.hotelbeds.com/giata/bigger/36/365419/365419a_hb_ro_003.jpg" width={200} height={140} />;
                {/* <Image src="http://photos.hotelbeds.com/giata/bigger/36/365419/365419a_hb_ro_003.jpg" layout={"fill"} /> */}
              </div>
            </Col>

            <Col span={12} flex="1">
              <div style={{height: "100%", padding: "20px", border: "1px solid #E1E1E1"}}>
                <Row style={{width: "100%"}} justify="space-between">
                  <Col span={18}>
                    <h2><b>{hotel ? hotel.name : null}</b></h2>  
                    <p>{hotel ? hotel.address : null}</p> 
                    <p>Show on map</p>
                  </Col>
                  <Col span={6} style={{textAlign: "end", paddingTop: "2px"}}>
                    {hotel ? <><Rate style={{fontSize: 15}} disabled defaultValue={parseInt(hotel.rating)} /></> : null}
                  </Col>
                </Row>
                
                <Divider />   

                <Row justify="space-around" style={{fontSize: 18}}>
                  <Col span={18}><p style={{marginBottom: "0px"}}>Select a room starting from:</p></Col>
                  <Col span={6} style={{textAlign: "end"}}><p style={{marginBottom: "0px"}}><b>SGD {roomData[0] ? Number(roomData[0].price).toFixed(2) : 0}</b></p></Col>
                </Row>

                <Row justify="space-between" style={{fontSize: 15}}>
                  <Col span={18}><p>Earn at least:</p></Col>
                  <Col span={6} style={{textAlign: "end"}}><p><b>{roomData[0] ? roomData[0].points : 0} Miles</b></p></Col>
                </Row>  

                <Row justify="end">
                  <Button type="primary">See Room Options</Button>
                </Row>      
              </div>
            </Col>
          </Row>
        </Card>


        {/* HOTEL OVERVIEW */}
        <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}} bodyStyle={{padding: "0px"}}>
          <Row>
            <Col span={18}>
              <div style={{height: "100%", padding: "24px"}}>
                <h3 style={{fontSize: 20}}>Hotel Overview</h3>
                {ReactHtmlParser(fakeHotelData.description)}
              </div>
            </Col>

            <Col span={6}>
              <div style={{height: "100%", padding: "24px", borderLeft: "1px solid #E1E1E1"}}>
                <h3 style={{fontSize: 20}}>Guests Love...</h3>
                { Object.keys(fakeHotelData.amenities).map(key => <p>{key}</p>) }
              </div>
            </Col>
          </Row>
        </Card>


        {/* HOTEL ROOM OPTIONS */}
        <h3>Room Options</h3>
        {Object.entries(groupedRoomData).map(([roomType, roomsArr]) => {
          const roomTypeImage = getRoomTypeImage(roomsArr);
          return (
            <Card 
              title={roomType} 
              bordered={true}
              style={{ borderColor: "#E1E1E1", marginBottom: "20px" }}
              headStyle={{ backgroundColor: "#E1E1E1" }}
              bodyStyle={{ padding: "0px" }}
            >
              <Row>
                <Col span={6}>
                  <div style={{margin: "20px", borderRight: "1px solid #E1E1E1"}}>
                    {roomTypeImage != null ? (
                      <Imgix src={roomTypeImage} width={200} height={140} />
                      // <Image src={roomTypeImage} width={200} height={140} objectFit={"cover"}/>
                    ) : (
                      <Imgix src="http://photos.hotelbeds.com/giata/bigger/36/365419/365419a_hb_ro_003.jpg" width={200} height={140} />
                      // <Image src="http://photos.hotelbeds.com/giata/bigger/36/365419/365419a_hb_ro_003.jpg" width={200} height={140} objectFit={"cover"} />
                    )}
                    <p style={{marginTop: "10px"}}>View More</p>
                  </div>
                </Col>

                <Col span={18}>
                  <List
                    itemLayout="vertical"
                    dataSource={roomsArr}
                    renderItem={item => (
                      <>
                      <List.Item style={{padding: "20px 0px"}} key={item.id}>
                        <Row>
                          <Col span={12}>
                            <div style={{padding: "0px 20px", textAlign: "left"}}>
                              <p style={{marginBottom: "5px", fontSize: 18}}>{item.additionalInfo}</p>
                              <p style={{marginBottom: "0px", fontSize: 14, color: "#FB9501"}}>Non-refundable</p>
                            </div>
                          </Col>
                          <Col span={8}>
                            <div style={{padding: "0px 20px", textAlign: "right"}}>
                              <p style={{marginBottom: "0px", fontSize: 15}}><b>SGD {item.price}</b></p>
                              <p style={{fontSize: 12}}>per room per night</p>
                              <p style={{marginBottom: "0px", fontSize: 12}}>Total earn for 1 night: <span style={{display: "inline", color: "#FB9501"}}><b>{item.points} Miles</b></span></p>
                            </div>
                          </Col>
                          <Col span={4}>
                            <div style={{padding: "0px 20px", justifyContent: "center"}}>
                              <Link 
                                href={{
                                  pathname: "/hotels/checkout",
                                  query: {
                                    bookingKey: item.id,
                                    dest_id: searchQuery.dest_id,
                                    hotel_id: searchQuery.hotel_id,
                                    checkin: searchQuery.checkin,
                                    checkout: searchQuery.checkout,
                                    country: searchQuery.country,
                                    currency: searchQuery.currency,
                                    guest: parseInt(searchQuery.guest),
                                  }
                                }}
                              >
                                <Button type="primary" style={{width: "100%"}} onClick={() => bookRoom(item)}>Select</Button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </List.Item>
                      </>
                    )}
                  />
                </Col>
              </Row>
            </Card>
          )
        })}
 

        {/* HOTEL LOCATION MAP */}
        <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}}>
          <h2>Location</h2>
          <p>Map here</p>
        </Card>
      </div>
    </Layout> 
    </>
  )
}


export async function getServerSideProps(context) {
  const API_URL =  "https://ojf2x5bl5bdr7e2czg4f6ogeua.appsync-api.ap-southeast-1.amazonaws.com/graphql";
  const HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "da2-juw2jskguzdjdndcrxmhscl634",
  }

  // Room Details API
  const roomParams = {
    hotel: context.query.hotel_id,
    id: context.query.dest_id,
    checkin: context.query.checkin,
    checkout: context.query.checkout,
    lang: context.query.lang,
    currency: context.query.currency,
    country: context.query.country,
    guest: context.query.guest
  }
  const roomData = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      query: '{\n  rooms (hotel: "'+roomParams.hotel+'", id: "'+roomParams.id+'", checkin: "'+roomParams.checkin+'", checkout: "'+roomParams.checkout+'", lang: "'+roomParams.lang+'", currency: "'+roomParams.currency+'", country: "'+roomParams.country+'", guest: "'+roomParams.guest+'") {\n            id,\n        description,\n        additionalInfo,\n        images,\n        amenities,\n        points,\n        price\n  }\n}\n',
      variables: null,
      operationName: null
    })
  }).then(res=>res.json()).catch((error) => {console.log(error)})

  if (!roomData) {
    return {
      notFound: true,
    }
  }

  // pass data to the page via props
  return {
    props: { roomData: roomData.data.rooms, searchQuery: context.query },
  }
}


export default Detail;