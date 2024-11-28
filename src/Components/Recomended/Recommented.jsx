import React, { useEffect, useState } from 'react'
import './Recommented.css'

import { API_KEY, value_convertor } from '../../data'
import { Link } from 'react-router-dom';

const Recommented = ({categoryId}) => {

const [apidata,setApiData]=useState([]);

const fetchdata=async()=>{
    const relatedvideo_URL=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    await fetch(relatedvideo_URL).then(res=>res.json()).then(data=>setApiData(data.items))
}

useEffect(()=>{
fetchdata();
},[])

  return (
    <div className='recommented'>
        {apidata.map((item,index)=>{
            return(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="vid-info">
                    <h4>{item.snippet.title}</h4>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{value_convertor(item.statistics.viewCount)} views</p>
                </div>
            </Link>
            )

        })}
       

       
      
    </div>
  )
}

export default Recommented
