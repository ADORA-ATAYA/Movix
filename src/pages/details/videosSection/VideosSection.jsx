import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopUp/VideoPopUp";
import Img from "../../../components/lazyloadimage/Img";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
    const [show, setshow] = useState(false)
    const [videoId, setvideoId] = useState(null)

    const loadingSkeleton = ()=>{
        return(
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    }

    return(
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {
                    !loading?(
                        <div className="videos">
                            {
                                data?.results?.map((video)=>(
                                    <div key={video.id} 
                                    className="videoItem" 
                                    onClick={()=>{setvideoId(video.key);setshow(true)}}>
                                        <div className="videoThumbnail">
                                            <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                            <PlayIcon />
                                        </div>
                                        <div className="videoTitle">{video.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ):(
                        <div className="videoSkeleton">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    )
                }
            </ContentWrapper>
            <VideoPopup show={show} setShow={setshow} videoId={videoId} setVideoId={setvideoId}/>
        </div>
    )
}

export default VideosSection;