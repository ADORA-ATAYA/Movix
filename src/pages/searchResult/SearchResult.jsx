import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentwrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/Spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setdata] = useState(null)
  const [pageNum, setpageNum] = useState(1)
  const [loading, setloading] = useState(false)
  const {query} = useParams()

  const fecthInitialData = ()=>{
    setloading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      setdata(res)
      setpageNum((prev)=>prev+1);
      setloading(false)
    })
  }

  useEffect(() => {
    setpageNum(1)
    fecthInitialData();
  }, [query])
  
  const fetchNextPageData = ()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res)=>{
      if(data?.results){
        setdata({...data,results:[...data?.results , ...res?.results]})
      }else{ 
        setdata(res)
      }
      setpageNum((prev)=>prev+1)
    })
  }

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {
            data?.results?.length>0 ?(
              <>
                <div className="pageTitle">
                  {`Search ${data.total_results>1?"results":"result"} of ${query}`}
                </div>
                <InfiniteScroll className="content" dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pageNum<=data?.total_pages}>
                  {
                    data.results.map((item,idx)=>{
                      if(item?.media_type === "person")return;
                      return (
                        <MovieCard key={idx} data={item} fromSearch={true}/>
                      )
                    })
                  }
                </InfiniteScroll>
              </>
            )
            :(
              <span className="resultsNotFound">
                Sorry, Results not found!
              </span>
            )
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult