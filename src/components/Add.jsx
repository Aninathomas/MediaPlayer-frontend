import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadAllvideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Add({setUploadVideoStatus}) {
   

    const [video,setVideo]=useState({
      id:"",
      caption:"",
      url:"",
      embedLink:""
    })
    //console.log(video);
    const embedVideoLink=(e)=>{
      const {value} = e.target
      console.log(value.slice(-11));
      const link=`https://www.youtube.com/embed/${value.slice(-11)}`
      setVideo({...video,embedLink:link})
    }
    console.log(video);

   const handleUpload=async()=>{
    const {id,caption,url,embedLink}=video
    if(!id || !caption || !url || !embedLink){
     toast.warning('Please fill the form Completely')
    }
    else{
       const response = await  uploadAllvideo(video)
       console.log(response);
       if(response.status>=200 && response.status<300){
       toast.success(`${response.data.caption} is successfull Uploaded`)
      // to change the value of uploadvideoStatus
     
     setUploadVideoStatus(response.data)
     
       //to close the modal
      handleClose()
    }
    else{
      console.log(response);
     toast.error('Something Went Wrong.Try again later')
    }
   }
   }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
        <div className='d-flex align-items-center'>
            <h5>Upload New video</h5>
            <button onClick={handleShow} className='btn '><i class="fa-solid fa-arrow-up fs-5"></i></button>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Please Fill the form completely</p> 
        <form className='border border-secondary rounded p-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter VIdeo id" onChange={(e)=>setVideo({...video,id:e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter VIdeo Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter VIdeo Image Url" onChange={(e)=>setVideo({...video,url:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Youtube Video link" onChange={embedVideoLink}/>
      </Form.Group>

        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored'/>
    </>
  )
}

export default Add