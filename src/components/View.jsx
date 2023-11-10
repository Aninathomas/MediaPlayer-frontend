import React, { Component, useEffect, useState } from 'react'

import { Col, Row } from 'react-bootstrap'

import VideoCards from './VideoCards'
import { getAllvideos } from '../services/allAPI'


function View({uploadvideoStatus}) {
  
  const [allvideo,setAllVideo]=useState([])
  const[deleteVideoStatus,setdeleteVideoStatus]=useState(false)
  const getAllUploadedvideos=async()=>{
  const response = await getAllvideos()
 //console.log(response);
 const {data}=response
 //console.log(data);
 setAllVideo(data)
  }
  console.log(allvideo);
  useEffect(()=>{
    getAllUploadedvideos()
    setdeleteVideoStatus(false)
  },[uploadvideoStatus,deleteVideoStatus])
  return (
    <>
    <Row>
      {
      allvideo.length>0?
        allvideo?.map((video)=>(<Col sm={12} md={6} lg={4} xl={3}>
          <VideoCards displayvideo={video} setdeleteVideoStatus={setdeleteVideoStatus}/>
        </Col>))
       :
      <p>Nothing to display</p>
      }
        
       
        
        
    </Row>
    </>
  )
}

export default View