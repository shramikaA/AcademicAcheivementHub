import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import axios from 'axios'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useNavigate } from 'react-router-dom'
import {Toaster,toast} from "sonner"

const changePassword = () => {
  const [oldPassword,setOldPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [username,setUsername] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/api/changePassword", { username, oldPassword ,newPassword })
     alert(response.data)
     setTimeout(()=>{
      navigate("/login")
     },3000)
    } catch (e) {
      console.error(e);
    }
  };

  const handleOldPassword = (e)=>{setOldPassword((e.target.value).toUpperCase())}
  const handleNewPassword = (e)=>{setNewPassword((e.target.value).toUpperCase())}
  const handleUsername = (e)=>{setUsername((e.target.value).toUpperCase())}

  return (
    <>
    <Toaster position='top-center' richColors/>
      <div className='flex justify-center mt-[100px]'>
    <Card className="mx-10 flex flex-col md:w-[30vw] bg-[#d5cfca8e] shadow-xl">
    <CardHeader>
      <CardTitle className="text-[20px] md:text-[30px] text-center">
        CHANGE PASSWORD
      </CardTitle>
    </CardHeader>
    <CardContent className="md:text-[1.2rem] md:mx-10 md:px-10">
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
    <div className='flex gap-5 items-center mt-5'>
      <Label htmlFor='username'>Enter Username:</Label>
      <Input type="text" onChange={handleUsername} value={username} required={true} id='username'/>
      </div>
      <div className='flex gap-5 items-center mt-5'>
      <Label htmlFor='oldPassword'>Enter old password:</Label>
      <Input type="password" onChange={handleOldPassword} value={oldPassword} required={true} id='oldPassword'/>
      </div>
        <div className='flex items-center gap-5 my-5'>
        <Label htmlFor='Newpassword'>Enter New Password:</Label>
        <Input type="password" name="newPassword" id="newPassword" onChange={handleNewPassword} value={newPassword} required={true} />
        </div>
        <Button>Confirm</Button>
        <a href="/login" className='text-sm mt-3 underline'>Return to Login?</a>
      </form>
    </CardContent>
  </Card>
      </div></>
    

  )
}

export default changePassword