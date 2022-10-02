import React from 'react'
import {Helmet} from "react-helmet";

const TitleHelmet = ({title, desc, keywords='shoppemark, shopping, latest products'}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={desc}/>
      <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

export default TitleHelmet