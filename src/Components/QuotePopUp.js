import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function QuotePopUp({showPopUp,setShowPopUp,symbol}) {
    const [quotedata,setquotedata] = useState([])
    useEffect(()=>{
        const fetchquote = async()=>{
            if(symbol?.target?.innerText){
                await axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol?.target?.innerText}`)
                .then(res=>res.json())
                .then(data=>{
                    setquotedata(data)
                })
            }
        }
        fetchquote()
    },[])
    if (!showPopUp) return null;
    return (
    <div>
      {console.log(symbol)}
      {console.log(quotedata)}
    </div>
  )
}
