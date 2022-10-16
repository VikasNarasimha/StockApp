import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Papa from "papaparse";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuotePopUp from './QuotePopUp';



export default function Data() {
 
    const [item,setitem] = useState([])
    const [filterval,setfilterval]=useState('');
    const [searchapidata, setsearchapidata] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpData, setPopUpData] = useState([]);
    const [quotedata,setquotedata] = useState()
    
    useEffect(()=>{
        const fetchtable = async ()=>{
            const s = await axios.get('https://prototype.sbulltech.com/api/v2/instruments')
            // console.log(s.data)
            const m=s.data
            // console.log(m)
            var commonConfig = { delimiter: "," };
            const CSVString =m;
            let json = Papa.parse(CSVString, {
              ...commonConfig,
              complete: (result) => {
                return result
              }
           });
          //  console.log(json.data)
           json.data.shift()
           json.data.pop()
           setitem(json.data.length>1 && json.data.map(it=>{
            const obj = Object.assign({},it)
            return obj
           }))
           setsearchapidata(json.data.length>1 && json.data.map(it=>{
            const obj = Object.assign({},it)
            return obj
           }))
           
        }
        fetchtable()
        

    },[])
    const handlefilter=(e)=>{
      if(e.target.value===''){
        setitem(searchapidata)
      }
      else{
        const filterresult = searchapidata.filter(it=>it[0].toLowerCase().includes(e.target.value.toLowerCase())||String(it[1]).toLowerCase().includes(e.target.value.toLowerCase()))
        if(filterresult.length>0){
        setitem(filterresult)
        }
        else{
          setitem(["---"])
        }
      }
      setfilterval(e.target.value)
    }
    const popupToggle = async (e) => {
       await axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${e}`)
                // .then((res)=>res.json())
                .then(data=>{
                    setquotedata(data?.data?.payload[e])
                    // setShowPopUp(!showPopUp)
                    
                })
      setPopUpData(e);
      setShowPopUp(!showPopUp);
    };
  return (
    <div className='mx-5'>
     {/* {item?.data?.length > 1 &&
      item.data.map(it=>{
        const obj = Object.assign({},it)
        console.log(obj)
      })
     } */}
     {console.log(item)}
     <div className='p-3 my-3 display-1' style={{textAlign:'center'}}>
     <h1 style={{fontSize:52}} >Stock App</h1>
     </div>
     <div className='p-3 my-3' style={{textAlign:'center'}}>
      <input type='search' placeholder='Search Symbol or Name' value={filterval} onInput={(e)=>handlefilter(e)}/>
     </div>
     <table className='table table-bordered table-hover my-3 p-3' style={{textAlign:'center'}}>
      <thead className='table-dark'>
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Sector</th> 
      </tr>
      </thead>
      {
        item.map(it=>{
          return(
            <tbody className='table-striped'>
            <tr>
              <td onClick={()=>popupToggle(it[0])}>{it[0]}</td>
              <td>{it[1]}</td>
              <td>{it[2]}</td>
            </tr>
            </tbody>
          )
        })
      }
     </table>
    
       <QuotePopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} symbol={popUpData} quotedata={quotedata}/>
    
    </div>
  )
}
