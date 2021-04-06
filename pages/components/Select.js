// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import { Select } from 'antd';
// import styles from "../../styles/components/selectList.module.css"

// const { Option } = Select;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

// export default function SelectList(){
//     return(
//         <div className={styles.selectList}>
//             <Select defaultValue="0" style={{ width: 120 }} onChange={handleChange}>
//                 <Option value="0">0</Option>
//                 <Option value="1">1</Option>
//                 <Option value="2">2</Option>
//                 <Option value="3">3</Option>
//                 <Option value="4">4</Option>
//              </Select>

//         </div>
        
    
//     )
// };

import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useRef, useState } from "react"

export default function SelectList() {
    const [val, setVal] = useState("")
    const onChange = useCallback((event) => {
        console.log(event.target.value)
        setVal(event.target.value)
        console.log(val)
    })

    return(
        <div>
        <select className="browser-default custom-select" onChange={onChange} value={val}>
          <option value="0" >0 </option>
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
        </select>
      </div>
    )
}