import React, { useEffect, useState } from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

export default function QuotePopUp({showPopUp,setShowPopUp,symbol,quotedata}) {
    // const [quotedata,setquotedata] = useState()

        // const fetchquote = async()=>{
        //     if(showPopUp){
        //         await axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
        //         // .then((res)=>res.json())
        //         .then(data=>{
        //             setquotedata(data)
        //             // setShowPopUp(!showPopUp)
        //         })
        //         setShowPopUp(!setShowPopUp)
        //     }
        // }
        // fetchquote()
    // if (!showPopUp) return null;
    
    // return (
    //     <div>
    //     <table>
    //     <tr>
    //         <th>bjdjndd</th>
    //     </tr>    
    //     </table>       
    //     </div>
    // ) 
    const popornot=()=>{
        setShowPopUp(!showPopUp)
    } 
    const showHideClassName = showPopUp ? "modal d-flex w-100 bg-white justify-content-center min-vh-100 min-vw-100 align-items-center" : "modal d-none";

  return (
    <div className={showHideClassName}>
    <div className='w-50 w-75 bg-dark zindex-modal '>
      <section className="position-fixed">
        <table>
            {
                quotedata && quotedata.map(op=>{
                    return(
                      <tbody className='table-striped'>
                      <tr>
                        <td>{op.price}</td>
                        <td>{op.time}</td>
                        <td>{op.valid_till}</td>
                        {/* <td>{it[1]}</td>
                        <td>{it[2]}</td> */}
                      </tr>
                      </tbody>
                    )
            }
                )
        }
        </table>
       
        
        <button type="button" className='btn btn-primary' onClick={popornot}>
          Close
        </button>
      </section>
      {console.log(quotedata)}
      </div>
    </div>
  );
}
