import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import save from '../../assets/save.png'
import share from '../../assets/share.png'
import { API_KEY, value_convertor } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'


const Playvideo = () => {

 const {videoId}=useParams(); 

const [apidata,setApiData]=useState(null);
const [channeldata,setChannelData]=useState(null);
const [commentdata,setCommentData]=useState([]);

const fetchvideoData=async()=>{
    //fetching videos data
    const videoDetails_URL=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_URL).then(response=>response.json()).then(data=>setApiData(data.items[0]) )
}

const fetchOtherData=async()=>{
    //fetching channel data
    const channeldata_URL=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`
    await fetch(channeldata_URL).then(res=>res.json()).then(data=>setChannelData(data.items[0]))
    
//fetching comment data
const comment_URL=` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
await fetch(comment_URL).then(res=>res.json()).then(data=>setCommentData(data.items))

}




useEffect(()=>{
fetchvideoData();
},[videoId])

useEffect(()=>{
fetchOtherData();
},[apidata])



  return (
    <div className='play-video'>
      {/* <video controls autoPlay muted src={video1}></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
       frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apidata?apidata.snippet.title:'title here'}</h3>
      <div className="play-video-info">
        <p>{apidata?value_convertor(apidata.statistics.viewCount):"15k"} views . {apidata?moment(apidata.snippet.publishedAt).fromNow():""}</p>
        <div>
            <span><img src={like} alt="" />{apidata?value_convertor(apidata.statistics.likeCount):"130"}</span>
            <span><img src={dislike} alt="" /></span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />

      <div className="publisher">
        <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="" />
        <div>
            <p>{apidata?apidata.snippet.channelTitle:"channel title"}</p>
            <span>{channeldata?value_convertor(channeldata.statistics.subscriberCount):"1M"} Subscribers</span>
        </div>

        <button>Subscribe</button>
      </div>

      <div className="video-description">
        <p>{apidata?apidata.snippet.description.slice(0,250):"description here"}</p>
        <hr />
        <h4>{apidata?value_convertor(apidata.statistics.commentCount):"200"} comments</h4>


{commentdata.map((item,index)=>{
return(
    <div key={index} className="comment">
    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
    <div>
        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div className="comment-action">
            <img src={like} alt="" /><span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
            <img src={dislike} alt="" />
        </div>
    </div>
</div>
)
})}
       
       
      </div>
    </div>
  )
}

export default Playvideo
