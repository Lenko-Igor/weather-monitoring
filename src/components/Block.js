import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import './block.css'
import Context from '../context'


function Block({props}){
  const {removeCity, updateDate} = useContext(Context)
  const city = props.city
  const iconUrl = "http://openweathermap.org/img/w/" + props.icon + ".png"
  const styles = {
    arrow: {
      display: 'inline-block', 
      width: '25px', 
      transform: `rotate(${props.windDeg}deg)`
    }
  }


  return (
    <div className="block">
      <h2>Город:<span> {props.city}</span></h2>
      <ul>
        <li>Температура:<span> {props.temp}°C</span><span><img src={iconUrl} alt={props.description}/></span></li>
        <li>Влажность:<span> {props.humidity}%</span></li>
        <li>Атмосферное давление:<span> {props.pressure}</span></li>
        <li>Сила и направление ветра:<span> {props.wind}, м/с</span><span style={styles.arrow}> &uarr; </span></li>
        <li>Последнее обновление данных:<br/>
        <span> {props.update.join(' ')}</span></li>
      </ul>
      <div className="wrap">
        <button onClick = {(e) => {
          e.preventDefault()
          removeCity(city)
        }} >Удалить</button>
        <button onClick = {(e) => {
          e.preventDefault()
          updateDate(city)
        }}>Обновить</button>
      </div>
    </div>
  )
}

Block.propTypes = {
  props: PropTypes.object.isRequired,
  removeCity: PropTypes.func,
  updateDate: PropTypes.func,
}

export default Block