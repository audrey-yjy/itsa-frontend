import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider } from 'antd';
import { format } from 'date-fns';


const Confirmation = ({ bookingRes, paymentRes }) => {
  // states
  const [hotel, setHotel] = useState();
  const [booking, setBooking] = useState();

  // load data 
  useEffect(() => {
    // get booking details from cache
    setHotel(localStorage.getItem("hotel") ? JSON.parse(localStorage.getItem("hotel")) : {name: "Loading"});

    // store booking response in cache
    setBooking(bookingRes && paymentRes == true ? bookingRes : {});
    if (bookingRes && paymentRes == true) {
      localStorage.setItem("bookingRes", JSON.stringify(bookingRes));
    }
    // console.log("BOOKING", results);
  }, []);


  return (
    <Layout>
      <div className={utilStyles.mainContainer} style={{top: 24}}>
        {bookingRes && paymentRes == true ? (
          <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}} bodyStyle={{padding: "50px 20px"}}>
            <div style={{textAlign: "center", paddingBottom: "10px"}}>
              <h1>Hi, {booking ? <span style={{textTransform: "capitalize"}}>{booking.customer.saluation}</span> : null} {booking ? booking.customer.firstName + " " + booking.customer.lastName: "Guest"}</h1>
              <p>Your booking at <b>{hotel ? hotel.name : "Hotel"}</b> has been confirmed.</p>
              <p>A confirmation email has been sent to <b>{booking ? booking.customer.email : null}</b>.</p>
            </div>
            
            <div style={{margin: "10px 20px", border: "1 px solid #CCCCCC"}}>
              <Divider orientation="left" style={{borderColor: "#DDDDDD"}}>Booking Details</Divider>
              <Row style={{fontWeight: "bold", textAlign: "center"}}>
                <Col span={8}>Booking</Col>
                <Col span={4}>Check-in</Col>
                <Col span={4}>Check-out</Col>
                <Col span={4}>Paid</Col>
                <Col span={4}>Status</Col>
              </Row>

              <Row style={{textAlign: "center"}}>
                <Col span={8}>{booking ? booking.bookingReferenceCode : "Booking Reference ID"}</Col>
                <Col span={4}>{booking ? format(new Date(booking.startDate), "d MMMM y") : "Checkin"}</Col>
                <Col span={4}>{booking ? format(new Date(booking.endDate), "d MMMM y") : "Checkout"}</Col>
                <Col span={4}>SGD {booking ? booking.totalPrice : 0 }</Col>
                <Col span={4} style={{color: "green"}}>Confirmed</Col>
              </Row>
            </div>
          </Card>
        ) : (
          <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}} bodyStyle={{padding: "50px 20px"}}>
            <div style={{textAlign: "center", paddingBottom: "10px"}}>
              <h1>Uh oh, something went wrong!</h1>
              <p>Please try again later.</p> 
            </div>
          </Card>
        )}
        
      </div>      
    </Layout> 
  )
}


export async function getServerSideProps(context) {  
  const API_URL = "https://gpz7qbnpe1.execute-api.ap-southeast-1.amazonaws.com";

  console.log("QUERY", context.query);

  function fetchBooking() {
    return fetch(API_URL + "/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "numberOfNight": parseInt(context.query.numberOfNight),
        "startDate": context.query.checkin,
        "endDate": context.query.checkout,
        "numOfAdults": parseInt(context.query.numOfAdults),
        "numOfKids": parseInt(context.query.numOfKids),
        "requestMessage": context.query.requestMessage,
        "roomType": context.query.roomType,
        "totalPrice": parseFloat(context.query.totalPrice),
        "customer": {
          "saluation": context.query.salutation,
          "firstName": context.query.firstName,
          "lastName": context.query.lastName,
          "email": context.query.email
        }
      })
    })
    .then(response => response.json())
    .then(data => { return data })
    .catch((error) => {
      console.log(error);
      return null;
    })
  }

  const paymentData = {
    "payeeName": context.query.cardName,
    "payeeCardNo": context.query.cardNumber,
    "price": parseFloat(context.query.totalPrice)
  }
  console.log(paymentData);
  function fetchPayment() {
    return fetch(API_URL + "/payment/OCBC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData)
    })
    .then(response => { 
      console.log(response)
      return response.ok 
    })
    .catch((error) => {
      console.log(error);
      return null;
    })
  }
  
  const bookingRes = await fetchBooking();
  const paymentRes = await fetchPayment();
 
  console.log("BOOKINGRES", bookingRes);
  console.log("PAYMENTRES", paymentRes);

  
  // pass data to the page via props
  return {
    props: { bookingRes, paymentRes },
  }
}


export default Confirmation;