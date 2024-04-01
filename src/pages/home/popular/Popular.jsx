import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {

    const [endPoint, setendPoint] = useState("movie")
    const {data ,loading} = useFetch(`/${endPoint}/popular`)
    const onTabChange = (tab)=>{
        setendPoint(tab === "Movies"?"movie":"tv")
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint= {endPoint}/>
    </div>
  )
}

export default Popular;