import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import './content.css'
import Block from './Block'
import Context from '../context'


function Content(){
  const {dataArr} = useContext(Context)

  
  if(!dataArr){
    return (
      <section></section>
    )
  } else {
    return(
      <section>
        { dataArr.map((e, i) => <Block props={e} key={i}/>) }
      </section>
    )
  }
}

Content.propTypes = {
  dataArr: PropTypes.arrayOf(PropTypes.object),
}

export default Content