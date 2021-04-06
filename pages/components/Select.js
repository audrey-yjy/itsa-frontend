import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState } from "react";

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