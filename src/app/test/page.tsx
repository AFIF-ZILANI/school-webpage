"use client"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { useAddData } from '@/lib/apiRequest';
// import { ImageUpload } from '@/components/imageUploader';
import { FileUploader } from '@/components/cloudinary/cloudinaryUpload';
import { useState } from 'react';
export default function Page() {
 const [uploadedImage, setUploadedImage] = useState({
         public_id: "",
         url: "",
     });
  // const {mutate, data}= useAddData("/test")
  // function handleRequest(){
  //   fetch('/api/test', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ key: 'fetch call' }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error:', error));
  // }
  // function handleRequestOne(){
    
  //   axios.post('/api/test', { key: 'axios Call' })
  //   .then(response => console.log(response.data))
  //   .catch(error => console.error('Error:', error));
  // }

  // function handleRequestTwo(){
  //   mutate({key: "react-query call"})
  // }

  return (
    <div className='flex gap-5 justify-center'>
      {/* <Button onClick={handleRequest}>Test by fetch</Button>
      <Button onClick={handleRequestOne}>Test by axios</Button>
      <Button onClick={handleRequestTwo}>Test by react-query</Button> */}
      {/* <ImageUpload/> */}
      {/* <FileUploader preset='teacher_con' setUploadedImage={setUploadedImage}/> */}
    </div>
  )
}
