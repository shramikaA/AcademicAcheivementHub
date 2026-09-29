import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";




const MyCertifications = () => {
  const  id  = localStorage.getItem("userNumber")
    console.log(id)
  const idData = { rollNumber: id }

  const [files, setFiles] = useState([]);

  const [description,setDescription] = useState([])

  const [user,setUser] = useState({})

  const [currentUser,setCurrentUser] = useState("")

  const navigate = useNavigate()

  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/getCertificates",
        idData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataArray = response.data.certificates;
      const allFiles = []; // Accumulate files here
      const allDescriptions = []

      for (let item of dataArray) {
        const initial = item.file;
        allFiles.push(...initial); // Add all files to the array
        allDescriptions.push(item.description)
      }
      setFiles(allFiles); // Update state once
      setDescription(allDescriptions)
      const userObj = response.data.user[0]
      setUser(prevState=>({
        ...prevState,
        name: userObj.name,
        rollNumber : userObj.rollNumber,
        department: userObj.department,
        section: userObj.section,
        passOutYear:userObj.passOutYear,
      }))

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkLoginStatus = async ()=>{
    const token = localStorage.getItem('token')
    if(!token){
      alert("You need to log in first")
      navigate('/login')
    }
  }

  useEffect(() => {
    checkLoginStatus()
    getData();
    try{
      const current = localStorage.getItem('userNumber')
      setCurrentUser(current)
    }catch(e){
      console.log(e)
    }
  }, []);


  const handleDelete = async(item)=>{

    const promptReply = confirm("Are you sure that you want to delete?")
    console.log(promptReply)
    if(promptReply){
      axios.post('http://localhost:8080/api/delete',{item})
      .then(res=>{
        console.log(res)
        getData()
      })
      .catch(e=>{
        console.log(e)
      })
    }
  }


  return (
    <div className="flex flex-col">
        {/*
      <h1 className="font-bold text-xl text-center my-5">
        CERTIFICATIONS AND ACHIEVEMENTS
      </h1>
       <h2 className="font-semibold text-lg text-center mb-1" >
          Student Name: {user.name}
      </h2>
      <h2 className="font-semibold text-lg text-center mb-1" >
          Class : {user.department}-{user.section} ({user.passOutYear - 4}-{user.passOutYear})
      </h2>
      <h2 className="font-semibold text-lg text-center mb-5" >
          Roll Number: {user.rollNumber}
      </h2> */}
      {files.length != 0 ? (
        <div className="flex justify-around flex-wrap">
          {files.map((file, index) => (
                    <Card key={index} className="mb-10 bg-[#d5cfca8e] shadow-xl" >
                    <CardHeader>
                    <img src={file} alt="" className=" max-w[500px] max-h-[500px] my-5 rounded-lg" />
                    </CardHeader>
                    <CardContent className="flex flex-col">
                      <CardDescription className="text-center mb-3 text-lg text-gray-900">{description[index]}
                      </CardDescription>
                      {(currentUser == user.rollNumber)?(
                        <div className="flex justify-center gap-5 text-2xl">
                        <MdDelete className="hover:pointer hover:text-red-500" onClick={()=>{
                        handleDelete(file)
                      }}/>
                      </div>):<></>}
                    </CardContent>
                  </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mx-10 mt-10">
            <div className="flex flex-col justify-center items-center border rounded-xl p-10">
            <h2 className="flex justify-center items-center font-bold text-[1rem] md:text-[3rem] mt-5 text-center">
          <span>
          No Certifications or Achievements to display
          </span>
        </h2>
        <Button  className="mt-5" onClick={()=>{
            navigate('/upload')
        }}>Upload</Button>
            </div>
        </div>

      )}
    </div>
  );
};

export default MyCertifications;
