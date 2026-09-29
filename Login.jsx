import React, { useState,useEffect } from 'react'
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



const Login = () => {
  useEffect(()=>{
  toast.error("Please login!")
},[])

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userNumber", response.data.user.rollNumber);
        console.log("Login Successful", response.data);
  
        toast.success("Logged in successfully");
  
        // Navigate back or to a fallback route
        setTimeout(() => {
          if (window.history.length > 1) {
            navigate(-1); // Navigate back to the previous page
          } else {
            navigate("/upload"); // Navigate to a default/fallback page
          }
        }, 1000);
      } else {
        console.error("Login failed");
        toast.error("Username or Password is incorrect!!");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred during login!");
    }
  };
  

  const handleUsername = (e)=>{setUsername((e.target.value).toUpperCase())}
  const handlePassword = (e)=>{setPassword((e.target.value).toUpperCase())}

  return (
      <div className='flex justify-center mt-[100px]'>
        <Toaster richColors position='top-center' />
    <Card className="mx-10 flex flex-col md:w-[30vw] bg-[#d5cfca8e] shadow-xl">
    <CardHeader>
      <CardTitle className="text-[20px] md:text-[30px] text-center">
        LOGIN
      </CardTitle>
    </CardHeader>
    <CardContent className="md:text-[1.2rem] md:mx-10 md:px-10">
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
      <div className='flex gap-5 items-center mt-5'>
      <Label htmlFor='username'>Username:</Label>
      <Input type="text" onChange={handleUsername} value={username} required={true} id='username'/>
      </div>
        <div className='flex items-center gap-5 my-5'>
        <Label htmlFor='password'>Password:</Label>
        <Input type="password" name="password" id="password" onChange={handlePassword} value={password} required={true} />
        </div>
        <Button>Login</Button>
        <a href="/changePassword" className='text-sm mt-3 underline'>Change Password ?</a>
      </form>
    </CardContent>
  </Card>
      </div>

  )
}

export default Login