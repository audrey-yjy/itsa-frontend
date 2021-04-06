// import { DatePicker, Space } from 'antd';
// import { useCallback } from 'react';


// const { RangePicker } = DatePicker;


// export default function Date_Picker() {
//   return (
//       <div>
//         <Space direction="vertical">
//           <DatePicker/>

//       </Space>
//       </div>
      

  
//   )
// }


import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { useCallback, useRef, useState } from "react"
import styles from "../../styles/components/DatePicker.module.css"
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Date_Picker() {
  const [date, setDate] = useState("")
  const [active, setActive] = useState(false)
  const [filteredResults, setFilteredResults] = useState([])

  const handleChange = useCallback((event) => {
    var month = event.getMonth() + 1
    var day = event.getDate()
    var year = event.getFullYear()
    console.log(typeof(month))
    if(month <= 9){
      month = "0" + month;
    }
    if(day <= 9 ){
      day = "0" + day
    }
    var finalDate = [year,month,day].join("-")
    console.log(finalDate)
    setDate(finalDate)
    console.log(date)
  })
  return(
      <div>
    <DatePicker
        // selected={ this.state.startDate }
        onChange={ handleChange }
        name="startDate"
        dateFormat="MM/dd/yyyy"
        value={date}
        className={styles.DatePicker}
    />
  </div>

  )
  

}
