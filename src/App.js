import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './index.css'
import Content from './components/Content'
import Context from './context'
import Widget from './components/Widget'
import Data from './data.json'


function App() {
  const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
  const [dataArr, setData] = useState([])
  const [checked, setChecked] = useState(false)
  const [listCitys, setListCitys] = useState([])

  useEffect(() => {
    const localDataArr = localStorage.getItem('dataArr') || []
    const localDataCitys = localStorage.getItem('listCitys') || []
    setData(JSON.parse(localDataArr))
    setListCitys(JSON.parse(localDataCitys))
  }, [])

  useEffect(() => {
    localStorage.setItem('dataArr', JSON.stringify(dataArr))
  }, [dataArr])

  useEffect(() =>{
    localStorage.setItem('listCitys', JSON.stringify(listCitys))
  }, [listCitys])

  useEffect(() => {
    if(checked){
      var interval = setInterval(() => {
        updateAllData()
      }, 5000)
      return () => {clearInterval(interval)}
    } else {
      clearInterval(interval)
    }
  })

  function updateAllData(){
    for (let i = 0; i < dataArr.length; i++){
      getData(dataArr[i].city)
        .then(city => {
          if(city){
            dataArr[i] = city
            setData([...dataArr])
          }
        })
    }
  } 

  function getWeatherData(city){
    if(Data.some(e => e === city && true)){
      getData(city).then(dataCity => {
        if(dataCity){
          setData ([...dataArr, dataCity])
          setListCitys([...listCitys, city]) 
        }
      })
      const inp = document.querySelector('#input')
      inp.value = ''
    }
  }

  function removeCity(city){
    const removeArr = dataArr.filter(e => e.city !== city && true)
    const removeCity = listCitys.filter(e => e !== city && true)
    setData([...removeArr])
    setListCitys([...removeCity])
  }

  function updateDate(city){
    getData(city)
      .then(city => {
        if(city){
          const update = dataArr.map(elem => (elem.city === city.city)? elem = city : elem)
          setData([...update])
        }
      })
  }

  async function getData(city){
    const apiURL = 'https://api.openweathermap.org/data/2.5/';
    const cityName = city;
    const apiKey = '012244e216d87e61ae79056438d73ff3';
    const apiQuery = apiURL + 'weather?q=' + cityName + '&units=metric&lang=ru&appid=' + apiKey;
    
    try{
      const response = await fetch(apiQuery),
            data = await response.json(),
            date = new Date()

      return {'city': data.name,
        'temp': data.main.temp,
        'icon': data.weather[0].icon,
        'description': data.weather[0].description,
        'humidity': data.main.humidity,
        'pressure': data.main.pressure,
        'wind': data.wind.speed,
        'windDeg': data.wind.deg,
        'update': [date.getDate(), months[date.getMonth()], date.getFullYear(), `${date.getHours()} :`, `${date.getMinutes()} :`, date.getSeconds()]
      }
    }
    catch(error){
      console.log('Ошибка при передаче данных. Причина:' + error)
    }
  }

  return (
    <Context.Provider 
      value={{dataArr, removeCity, updateDate}}
    >
      <Widget/>
      <Container>
        <Row>
          <div className='input'>
            <input
              id='input'
              className='city_name'
              type='text' 
              autoComplete='false'
              placeholder='введите название города'
            />
            <button 
              type='submit' 
              onClick = {(e) => {
                e.preventDefault()
                const inp = document.querySelector('#input')
                getWeatherData(inp.value)
              }}
            >Отправить</button>
            <div className='cicle_update'>
              <input 
                type='checkbox' 
                checked = {checked}
                onChange = {() => setChecked(!checked)}
              />
              <p>Автообновление каждые 5с</p>
            </div>
          </div>
          <Content/>
        </Row>
      </Container>
    </Context.Provider>
  );
}

export default App;
