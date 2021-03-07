import React, {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import './widget.css'
import Context from '../context'



function Widget(){
  const {dataArr} = useContext(Context)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => { setData(dataArr) }, [dataArr])
  
  const temp = data.map(e => e = e.temp).sort((a,b) => a-b)
  const minTemp = data.filter(e => e.temp === temp[0] && true)[0]
  const maxTemp = data.filter(e => e.temp === temp[temp.length - 1] && true)[0]

  function toOpenClose(){
    setVisible(!visible)
  }
  
  if(visible){
    return(
      <div className='widget'>
        <div className="title">
          <h2>температура</h2>
          <p onClick = {toOpenClose}>&#x274C;</p>
        </div>
        <div className='wrapper'>
          <h4>max температура:</h4>
          <p>{maxTemp.city}<span>{maxTemp.temp}°C</span></p>
          <h4>min температура:</h4>
          <p>{minTemp.city}<span>{minTemp.temp}°C</span></p>
        </div>
      </div>
    )
  } else {
    return(
      <div className='widget'>
        <div className="title">
          <h2>температура</h2>
          <p onClick = {toOpenClose}>&#9776;</p>
        </div>
      </div>
    )
  }
}

Widget.propTypes = {
  dataArr: PropTypes.arrayOf(PropTypes.object),
}

export default Widget