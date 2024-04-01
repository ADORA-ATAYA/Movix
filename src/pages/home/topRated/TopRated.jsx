import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const TopRated = () => {

    const [endPoint, setendPoint] = useState("movie")
    const {data ,loading} = useFetch(`/${endPoint}/top_rated`)
    const onTabChange = (tab)=>{
        setendPoint(tab === "Movies"?"movie":"tv")
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint= {endPoint}/>
    </div>
  )
}

export default TopRated;