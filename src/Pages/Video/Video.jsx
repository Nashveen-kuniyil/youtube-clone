import React from 'react'
import './Video.css'
import Playvideo from '../../Components/Playvideo/Playvideo'
import Recommented from '../../Components/Recomended/Recommented'
import { useParams } from 'react-router-dom'

const Video = () => {

const {videoId,categoryId}=useParams();


  return (
    <div className='play-container'>
      <Playvideo videoId={videoId}/>
      <Recommented categoryId={categoryId}/>
    </div>
  )
}

export default Video
