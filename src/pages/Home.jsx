import React, { useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'
import { Link } from 'react-router-dom'

function Home() {
  // create state to do state lifting
  const [uploadvideoStatus, setUploadVideoStatus ]=useState({})
  return (
    
    <>
    <div className="container mt-5 mb-5 d-flex justify-content-between align-items-center">
    <div className="add-vedios">
    <Add setUploadVideoStatus={setUploadVideoStatus}/>
    </div>
    <Link to={'/watch-history'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>Watch History</Link>
    </div>
    <div className='container-fluid w-100  mt-5 mb-5 d-flex justify-content-between'>
        <div className='all-vedios col-lg-9'>
          <h4 className='mb-5'>All videos</h4>
          <View uploadvideoStatus={uploadvideoStatus}/>
        </div>
        <div className='category col-lg-3'>
          <Category/>
        </div>
      </div>
      
    </>
   
  )
}

export default Home