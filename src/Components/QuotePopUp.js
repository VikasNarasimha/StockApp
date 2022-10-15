import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function QuotePopUp({showPopUp,setShowPopUp,symbol}) {
    const [quotedata,setquotedata] = useState()
    useEffect(()=>{
        const fetchquote = async()=>{
            if(symbol.length){
                await axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
                // .then((res)=>res.json())
                .then(data=>{
                    setquotedata(data)
                })
            }
        }
        fetchquote()
    },[symbol])
    if (!showPopUp) return null;
    return (
    <div>
    
      {console.log(symbol)}
      {console.log(quotedata)}
      {/* {console.log(quotedata.data)}
      {console.log(quotedata.data.payload)} */}
       
    </div>
  )
}
