import React, { useEffect } from "react";
import { useState } from "react";
import { Input,Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea"
import {toast,Toaster} from "sonner"

const Upload = () => {

  const navigate = useNavigate()

  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);

  //roll number input State
  const [value, setValue] = useState(localStorage.getItem('userNumber'));
  const handleChange = (event) => setValue(event.target.value);

  const [description,setDescription] = useState("")
  const handleDescriptionChange=(e)=>setDescription(e.target.value)

  const convertToBase64 = (e) => {
    const filesSubmitted = Array.from(e.target.files); // Convert FileList to Array

    setFiles((prevFiles) => [...prevFiles, ...filesSubmitted]);

    filesSubmitted.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setBase64Files((prevBase64Files) => [
          ...prevBase64Files,
          reader.result,
        ]);
      };

      reader.onerror = (error) => {
        console.error("Error:", error);
      };
    });
  };

  const checkLoginStatus = async ()=>{
    const token = localStorage.getItem('token')
    if(!token){
      console.log("Not logged in!")
    }
  }

  useEffect(()=>{
    checkLoginStatus()
  },[])


  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    const token = localStorage.getItem("token");

    try{
      const response = await axios.post('http://localhost:8080/api/upload',[value,base64Files,description],{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      console.log('Response from server :',response.data)
      toast.success("Successfully uploaded your certifications")
      setTimeout(()=>{
        navigate(`/display/${value.toUpperCase()}`)
      },2000)
    }catch(error){
      console.error('Error Sending Data: ',error)
    }
  }


  //console.log("Files:", files);
  //console.log("Base64 Files:", base64Files);

  return (
    <div className="flex justify-center">
      <div className="border p-10 rounded-lg bg-[#d5cfca8e] shadow-xl">
      <Toaster richColors position="top-center" />
      <form action="" onSubmit={handleSubmit}>
        <h1 className="font-bold  text-[1.5rem] md:text-[2rem] my-5 text-center">
          Upload your certifications
        </h1>
        <div>
          <label htmlFor="rollInput" className="md:text-md text-md">Roll Number</label>
          <Input
            value={value}
            onChange={handleChange}
            placeholder="Roll Number"
            size="sm"
            className="uppercase mb-5 mt-3 bg-white"
            id="rollInput"
            required={true}
            readOnly={true}
          />
        </div>
        <div>
          <label htmlFor="desciption" className="text-md md:text-md">Enter Description</label>
          <Textarea value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Describe your certification(s)"
                      size="sm"
                      className="mb-5 mt-3"
                      id="description" required={true}/>

        </div>
        <div className="flex justify-center flex-col">
          <label htmlFor="fileUpload" className="mb-3 text-md md:text-md">Select files:</label>
        <input
          type="file"
          accept="images/*"
          onChange={convertToBase64}
          multiple
          id="fileUpload"
          className="text-xs md:text-sm"
          required={true}
        />
        </div>
        <div className="text-center mt-10">
        <Button>Submit</Button>
        </div>
      </form>
      </div>

    </div>
  );
};

export default Upload;
