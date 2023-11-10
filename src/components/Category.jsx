import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addToCategories, deleteCategory, getAllCategory, getAnVideo, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { upload } from '@testing-library/user-event/dist/upload';
import { Col, Row } from 'react-bootstrap';
import VideoCards from './VideoCards';


function Category() {
  const[categoryName,setCategoryName]=useState({})
  const[allCategory,setAllCategory]=useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //function to add category
  const handleADDCategory=async()=>{
  console.log(categoryName);
  if(categoryName){
    let body=
    { categoryName,
      allvideos: []
    }
 // make api call
 const response= await addToCategories(body)
  console.log(response);
  if(response.status>=200 && response.status<300 ){
   toast.success('Category Successfully Added')
   //to make the state null after successfull addition
   setCategoryName("")
   //to close modal
   handleClose()
  }
 else{
  console.log(response);
 toast.error ('Something went wrong.Please try again later')
 }
  }
  else{
   toast.warning('Please fill the category Name')
  }
  }

  //function to get all category
  const getallCategory =async()=>{
    const {data} = await getAllCategory()
    /*console.log(data);*/
    setAllCategory(data)
  }
  console.log(allCategory);
  
  //function to delete category
  const HandleDelete=async(id)=>{
    await deleteCategory(id)
    getallCategory()
  }

  //dragover  eventListener
  const dragover=(e)=>{
    //this will prevent reload so that the data that we send from videocard.jsx wont be lost
    e.preventDefault()
    console.log('inside dragover');
  }
  const videoDrop=async(e,categoryId)=>{
    console.log(`dropped inside the categoryid ${categoryId}`);
    //to get the videoid that is send from videocard component
    const videoid=e.dataTransfer.getData("videoID")
    console.log(videoid);
    // api to get particular video that is draged
 const {data} = await getAnVideo(videoid)
 console.log(data);
// to find the particular category with the specified id
 let selectedCategory=allCategory?.find(item=>item.id===categoryId)
 console.log(selectedCategory);
 //data is added to the allvideos array in the particular category with the specified id
 selectedCategory.allvideos.push(data)
 console.log(selectedCategory);

 await updateCategory(categoryId,selectedCategory)
getAllCategory()
  }



  useEffect(()=>{
    getallCategory()}
  ,[])
  

  return (
    <>
      <div className='d-grid ms-3'>
        <button onClick={handleShow} className='btn btn-warning'>Add New Category</button>
      </div>

    { allCategory?.length>0?
    allCategory?.map((item)=>(<div className='mt-5 border border-secondary rounded p-3'>
    <div className="d-flex justify-content-between align-items-center" droppable onDragOver={(e)=>dragover(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
     <h6>{item.categoryName}</h6>
     <Button onClick={()=>HandleDelete(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></Button>
    </div>
    <Row>
    <Col sm={12}>
      {
        item.allvideos?.length>0?
        item.allvideos.map(card=>(<VideoCards
          displayvideo={card}/>))
       :<p>Nothing To Display</p>
      }
    </Col>
    </Row>
   </div>))
    :<p className='mt-4 ms-4'>Nothing to display</p>
    }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-pencil me-2 text-warning"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
         <form className='border border-secondary rounded p-3'>
       

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Category Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter Category Name" onChange={(e)=>setCategoryName(e.target.value)}/>
      </Form.Group>

        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleADDCategory} variant="warning">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored'/>
    </>
  )
}

export default Category