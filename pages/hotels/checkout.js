import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, Checkbox } from 'antd';
import { differenceInDays, format } from 'date-fns';


const { TextArea } = Input;
const { Option } = Select;

const monthsArr = [{value: "Jan"}, {value: "Feb"}, {value: "Mar"}, {value: "Apr"}, {value: "May"}, {value: "Jun"}, {value: "Jul"}, {value: "Aug"}, {value: "Sep"}, {value: "Oct"}, {value: "Nov"}, {value: "Dec"}];
const yearsArr = [{value: "2021"}, {value: "2022"}, {value: "2023"}, {value: "2024"}, {value: "2025"}, {value: "2026"}, {value: "2027"}, {value: "2028"}, {value: "2029"}, {value: "2030"}, {value: "2031"}];
const countriesArr = [{value: "Singapore"}, {value: "Japan"}];
const countryCodesArr = [{value: "Singapore (+65)"}, {value: "Japan (+86)"}];

const formInitialValues = {
  "salutation": "Ms",
  "firstName": "Audrey",
  "lastName": "Yeo",
  "countryCode": "Singapore (+65)",
  "phoneNumber": "98765432",
  "requestMessage": "",
  "email": "myemail@gmai.com",
  "membershipNumber": "012345678",
  "memberFirstName": "Audrey",
  "memberLastName": "Yeo",
  "cardNumber": "5520-1234-5678-0000",
  "cardName": "Audrey Yeo",
  "expiryMonth": "Jun",
  "expiryYear": "2025",
  "cvv": "123",
  "bank": "OCBC",
  "billingAddress": "17 Dhoby Ghaut Drive",
  "billingCity": "Singapore",
  "billingPostCode": "123456",
  "billingCountry": "Singapore"
}


const Checkout = ({ searchQuery }) => {
  const router = useRouter();
  
  // constants
  const checkinDate = new Date(searchQuery.checkin);
  const checkoutDate = new Date(searchQuery.checkout);

  // states
  const [hotel, setHotel] = useState();
  const [room, setRoom] = useState();
  const [booking, setBooking] = useState();
  const [query, setQuery] = useState();
  const [checkoutData, setCheckoutData] = useState();


  // functions
  const makeBooking = (values) => {
    // update booking state with values
    const updatedBooking = {
      "numberOfNight": parseInt(booking.numberOfNight),
      "checkin": booking.checkin,
      "checkout": booking.checkout,
      "numOfAdults": parseInt(query.numAdults),
      "numOfKids": parseInt(query.numChildren),
      "requestMessage": values.requestMessage,
      "roomType": booking.roomType,
      "totalPrice": parseFloat(booking.totalPrice),
      "salutation": values.salutation,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "email": values.email,
      "cardName": values.cardName,
      "cardNumber": values.cardNumber
    }
    router.push({
      pathname: "/hotels/confirmation",
      query: updatedBooking
    }, "/hotels/confirmation");
    setCheckoutData(updatedBooking);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // data loading 
  useEffect(() => {
    // get hotel & room details from cache
    setHotel(localStorage.getItem("hotel") ? JSON.parse(localStorage.getItem("hotel")) : {name: "Loading", address: "Loading", rating: "0"});
    setRoom(localStorage.getItem("room") ? JSON.parse(localStorage.getItem("room")) : {});
    setQuery(localStorage.getItem("searchQuery") ? JSON.parse(localStorage.getItem("searchQuery")) : {});
  }, []);


  useEffect(() => {
    const numNights = differenceInDays(checkoutDate, checkinDate);
    if (room != null && localStorage.getItem("searchQuery")) {
      const bookingData = {
        bookingKey: searchQuery.bookingKey,
        checkin: searchQuery.checkin,
        checkout: searchQuery.checkout,
        numberOfNight: parseInt(numNights),
        roomType: room.description,
        price: parseFloat(room.price),
        totalPrice: parseFloat(room.price * numNights),
        currency: searchQuery.currency,
        country: searchQuery.country,
        guest: parseInt(searchQuery.guest)
      }
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
      setBooking(localStorage.getItem("bookingData") ? JSON.parse(localStorage.getItem("bookingData")) : {});      
    }
  }, [room]);


  // console.log("HOTEL", hotel);
  // console.log("ROOM", room);
  console.log("BOOKING", booking);


  return (
    <Layout>
      <div className={utilStyles.mainContainer} style={{top: 24}}>
        <Row justify="start">
          <Col flex={1}>
            <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}}>
              You're just 1 click away from earning {room ? room.points : 0 } miles!
            </Card>
          </Col>
        </Row>

        <Form
          layout="vertical"
          initialValues={formInitialValues}
          onFinish={makeBooking}
          onFinishFailed={onFinishFailed}
          // fields={fields}
          // onFieldsChange={(newFields) => {
          //   setFields(newFields);
          //   console.log(fields);
          // }}
        >
          <Row justify="space-between" gutter={16}>
            {/* LEFT COLUMN */}
            <Col span={16}>
              <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}}>
                <h3 className={utilStyles.formSectionTitle}>Primary Guest</h3>
                <Row gutter={16}>
                  <Col span={4}>
                    <Form.Item label="Title" name="salutation">
                      <Select>
                        <Option value="mr">Mr.</Option>
                        <Option value="ms">Ms.</Option>
                        <Option value="mrs">Mrs.</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item label="First Name" name="firstName">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item label="Last Name" name="lastName">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Country Code" name="countryCode">
                      <Select placeholder="Country Code" options={countryCodesArr}></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phone Number" name="phoneNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                
                <h3 className={utilStyles.formSectionTitle}>Special Requests</h3>
                <Form.Item name="requestMessage">
                  <TextArea 
                    rows={3} 
                    showCount 
                    maxLength={250}
                    placeholder="We will pass on the requests to the hotel. Please note that all requests are at the hotel's discretion and not guaranteed."  
                  />
                </Form.Item>
              </Card>

              <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}} bodyStyle={{paddingBottom: "5px"}}>
                <h3 className={utilStyles.formSectionTitle}>Your Details</h3>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="First Name" name="firstName">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email Address" name="email">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="remember" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Checkbox defaultChecked={false}>Keep me informed of exclusive offers and special frequent flyer tips from Kaligo and our partners.</Checkbox>
                </Form.Item>
              </Card>

              <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}} bodyStyle={{paddingBottom: "5px"}}>
                <h3 className={utilStyles.formSectionTitle}>Enter your Singapore Airlines KrisFlyer Membership Details</h3>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Membership Number" name="membershipNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Member First Name" name="memberFirstName">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Member Last Name" name="memberLastName">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}} bodyStyle={{paddingBottom: "5px"}}>
                <h3 className={utilStyles.formSectionTitle}>Payment Information</h3>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Card Number" name="cardNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Name on Card" name="cardName">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item label="Expiry Date" name="expiryMonth">
                      <Select placeholder="Month" options={monthsArr}></Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label=" " name="expiryYear">
                      <Select placeholder="Year" options={yearsArr}></Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="CVV/CVC" name="cvv">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item hidden name="bank">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                
                <h3 className={utilStyles.formSectionTitle}>Billing Information</h3> 
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Address" name="billingAddress">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="City" name="billingCity">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item label="Zip/Post Code" name="billingPostCode">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Country" name="billingCountry">
                      <Select placeholder="Country" options={countriesArr}></Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Form.Item name="remember" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Checkbox defaultChecked={false}>I agree to the Cancellation Policy and Kaligo's Terms of Use and Privacy policy</Checkbox>
              </Form.Item>

              <Card bordered={true} style={{borderColor: "#FBBA00", backgroundColor: "#FFF8E5", marginBottom: "10px"}}>
                This booking may have important restrictions. Please read the important hotel remarks and cancellation policy closely before completing your booking.
              </Card>

              <Card bordered={false} style={{backgroundColor: "transparent"}} bodyStyle={{display: "flex", flexDirection: "column", alignItems:"center"}}  >
                <Form.Item style={{width: "450px"}}>
                  <Button type="primary" size="large" block htmlType="submit">
                    Confirm Booking
                  </Button>
                </Form.Item>
                <p><b>{booking ? booking.currency : "$"} {booking ? Math.round( booking.totalPrice * 100 + Number.EPSILON ) / 100 : 0}</b> will be charged to your card immediately</p>
                <p>Miles will be credited to your account within 6 weeks after the completion of your hotel stay</p>
              </Card>
            </Col>

            {/* RIGHT COLUMN */}
            <Col span={8}>
              <Card bordered={true} style={{borderColor: "#E1E1E1", marginBottom: "24px"}}>
                <h3 className={utilStyles.formSectionTitle}>Booking Summary</h3>
                <div style={{borderBottom: "1px solid #CCCCCC", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                  <span style={{fontSize: 18, paddingBottom: "5px"}}><b>{hotel ? hotel.name : null}</b></span> 
                  <span style={{fontSize: 16, paddingBottom: "0px"}}><b>{room ? room.description : null}</b></span>
                  <span style={{fontSize: 16, paddingBottom: "5px"}}><b>Room Only</b></span>
                  <span style={{fontSize: 16, paddingBottom: "15px"}}>1 room  {booking ? booking.guest : 0} guests / Per Room</span>
                </div>

                <div style={{padding: "5px 0px", fontSize: 14, borderBottom: "1px solid #CCCCCC"}}>
                  <div style={{padding: "5px 8px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <span>Check-in</span>
                    <span><b>{booking ? format(checkinDate, "d MMMM y") : "Load checkin"}</b></span>
                  </div>

                  <div style={{padding: "5px 8px", fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <span>Check-out</span>
                    <span><b>{booking ? format(checkoutDate, "d MMMM y"): "Load checkout"}</b></span>
                  </div>

                  <div style={{padding: "5px 8px", fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <span></span>
                    <span><b>{booking ? booking.numberOfNight : 1} Night{booking && booking.numberOfNight > 1 ? "s" : null}</b></span>
                  </div>

                  <div style={{padding: "5px 8px", fontSize: 12, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <span>Average per room per night</span>
                    <span>{booking ? booking.currency : "$"} {booking ? booking.price : 0}</span>
                  </div>
                </div>
                
                <div style={{padding: "5px 0px", fontSize: 12, borderBottom: "1px solid #CCCCCC"}}>
                  <Row style={{padding: "5px 8px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Col span={16} style={{display: "flex", flexDirection: "column"}}><span>Room Rate</span><span>({booking ? booking.numberOfNight : 0} night{booking && booking.numberOfNight > 1 ? "s" : null}, 1 room)</span></Col>
                    <Col span={8} style={{textAlign: "right"}}>{booking ? booking.currency : "$"} {booking ? Math.round( booking.totalPrice*0.85 * 100 + Number.EPSILON ) / 100 : 0}</Col>
                  </Row>
                  <Row style={{padding: "5px 8px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Col span={16}>Tax Recovery Charges and Service Fees</Col>
                    <Col span={8} style={{textAlign: "right"}}>{booking ? booking.currency : "$"} {booking ? Math.round( booking.totalPrice*0.15 * 100 + Number.EPSILON ) / 100 : 0}</Col>
                  </Row>
                </div>

                <div style={{padding: "5px 0px"}}>
                  <div style={{padding: "5px 8px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <span><b>Total</b></span>
                    <span><b>{booking ? booking.currency : "$"} {booking ? Math.round( booking.totalPrice * 100 + Number.EPSILON ) / 100 : 0}</b></span>
                  </div>

                  <div style={{padding: "5px 8px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <span>Rewards</span>
                    <span style={{fontSize: 18, color: "#456EAD"}}><b>{room ? room.points : 0 } Miles</b></span>
                  </div>

                  <div style={{marginTop: "20px",display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <p style={{color: "#456EAD"}}>Miles will be credited to your account within 6 weeks after the completion of your hotel stay</p>
                    <p style={{marginBottom: "0px"}}>Bonus is subject to eligibility validation</p>
                  </div>
                </div>
              </Card>

              <Card bordered={true} style={{borderColor: "#E1E1E1"}} bodyStyle={{fontSize: 13}}>
                <h3 className={utilStyles.formSectionTitle}>Cancellation Policy</h3>
                <div style={{padding: "10px 0px", borderBottom: "1px solid #CCCCCC"}}>
                  This booking is <b>non-refundable</b>
                </div>

                <div style={{paddingTop: "10px"}}>
                  <span>This is a pre-paid rate. To change the dates, number of rooms etc. you will need to cancel this reservation subject to the existing cancellation policy and make a new booking based on the prevailing rates and availability.</span>
                  
                  <h3 className={utilStyles.formSectionTitle} style={{marginTop: "10px"}}>Important Hotel Remarks</h3>
                  Complimentary upgrade to Deluxe roomGuests are allowed to change of name more than 7 days prior to arrival date. Any request for name change is NOT allowed 7 days or less prior to arrival date. This will result as No-Show - will charge as per contract Cancellation Policy No amendment or cancellation will be accepted once bookings are made under this Non-Refundable PromotionChildren who are under 12 years of age will be sharing existing bed with parents. Children share the bed with parents 1.Car park YES (with additional debit notes).Check-in hour 15:00-00:00.As a result of local government measures and guidelines put in place by services providers – including hotels and ancillaries – guests may find that some facilities or services are not available.Please visit https://static-sources.s3-eu-west-1.amazonaws.com/policy/index.html for further information (15/05/2020-30/04/2021)
                </div>
              </Card>
            </Col>      
          </Row>
        </Form>
      </div>      
    </Layout> 
  )
}


export async function getServerSideProps(context) {
  // pass data to the page via props
  return {
    props: { searchQuery: context.query },
  }
}


export default Checkout;