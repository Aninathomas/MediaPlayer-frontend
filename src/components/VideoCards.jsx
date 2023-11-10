import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { addToHistory, deleteVideos } from '../services/allAPI';

function VideoCards({displayvideo,setdeleteVideoStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true)

    const {caption,embedLink}=displayvideo
    const today=new Date
   // console.log(today);
   let timeStamp=new Intl.DateTimeFormat('en-US', {
   year:'numeric',
   month:'2-digit',
   day:'2-digit',
   hour:'2-digit',
   minute:'2-digit',
   second:'2-digit'
  }).format(today)
console.log(timeStamp);

  
  let videoDetails={
    caption:caption,
    embedLink:embedLink,
    timeStamp:timeStamp
  }
  await addToHistory(videoDetails)
}
  const removeVideo=async(id)=>{
    const response= await deleteVideos(id)
    console.log(response);
    setdeleteVideoStatus(true)
  }

  const dragStated=(e,id)=>{
    console.log(`card no:${id} started dragging`);
    /*console.log(e);*/
    /*for data transfer*/
    e.dataTransfer.setData("videoID",id)
  }
  return (
    <>
    <Card style={{ width: '100%' ,height:'350px'}} className='mb-4' draggable onDragStart={(e)=>dragStated(e,displayvideo?.id)}>
      <Card.Img  height={'285px'} onClick={handleShow} variant="top" src={displayvideo.url}/>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
         <h6>{displayvideo.caption}</h6>
        <Button onClick={()=>removeVideo(displayvideo?.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></Button>
        </Card.Title>
      </Card.Body>
    </Card>
    
    
       <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{displayvideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="530" src={`${displayvideo.embedLink}?autoplay=1`} title="Jawan | Official Hindi Trailer | Shah Rukh Khan | Atlee | Nayanthara | Vijay S | Deepika P | Anirudh" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default VideoCards