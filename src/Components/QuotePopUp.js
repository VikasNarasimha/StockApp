import React, { useEffect, useState } from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import axios from 'axios'

export default function QuotePopUp({showPopUp,setShowPopUp,symbol,quotedata,setquotedata}) {
   const sorting = (da,val)=>{
    da && da.map((d)=>{
      if(val === 'ASC'){
        const sorted = [...quotedata].sort((a,b)=>
          a.time > b.time? 1 : -1
        )
       setquotedata(sorted) 
      }
      else{
        const sorted = [...quotedata].sort((a,b)=>
          a.time < b.time? 1 : -1
        )
       setquotedata(sorted) 
      }

    })
   }
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
    const showHideClassName = showPopUp ? "modal d-flex w-100 bg-light mh-100 justify-content-center align-items-center" : "modal d-none";

  return (
    <div className={showHideClassName}>
    <div className='w-50 w-75 zindex-modal '>
      <section className="position-relative">
        <h1 style={{textAlign:'center'}}>Quotes Page</h1>
        <table className='table table-bordered table-hover table-striped my-5'>
        <thead className='thead-active'>
        <tr>
        <th>Price</th>
        <th>Time</th>
        <th>Valid_Till</th>
      </tr>
        </thead>
            {
                quotedata && quotedata.map(op=>{
                    return(
                      <tbody className='table-striped'>
                      <tr>
                        <td>{op.price}</td>
                        <td>{op.time}</td>
                        <td>{op.valid_till}</td>
                      </tr>
                      </tbody>
                    )
            }
                )
        }
        </table>
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Sort By Time
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#" onClick={()=>sorting(quotedata,'ASC')}>Ascending Order</a></li>
    <li><a className="dropdown-item" href="#" onClick={()=>sorting(quotedata)}>Descending Order</a></li>
  </ul>
</div>
        
        <button type="button" className='btn btn-primary' onClick={popornot}>
          Close
        </button>
      </section>
      {console.log(quotedata)}
      </div>
    </div>
  );
}
