import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";


const Search = () => {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        branch:'',
        passYear:'',
        section:'',
    })

    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(!formData.branch || !formData.section || !formData.passYear){
            alert("Enter all details")
        }
        else{
            //console.log(formData)
            try{
              const response = await fetch("http://localhost:8080/api",{
                method:"POST",
                credentials:"include",
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
              })
              response.json()
              .then((data)=>{
                if(data.length != 0){
                  navigate("/display", {state:data})
                }else{
                  navigate("/display",{state:0})
                }
              })
              //navigate("/display")
            }
            catch(e){
              console.log(e)
            }
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData({
            ...formData,
            [name]:value,
        })
    }

  return (
    <div className="flex justify-center">
      <Card className="mx-10 flex flex-col md:w-[50vw] bg-[#d5cfca8e] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[20px] md:text-[30px] text-center">
            MRCET Student Achievements and Activities Hub
          </CardTitle>
          <CardDescription className="md:text-[20px] text-center">Select Branch, Year and Section</CardDescription>
        </CardHeader>
        <CardContent className="md:text-[1.2rem] md:mx-10 md:px-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <div className="flex justify-between mt-2">
                <p>Select Branch</p>
                <select name="branch" className="w-[150px] text-center rounded-md" onChange={handleChange}>
                <option value=""></option>
                    <option value="IT" >IT</option>
                    <option value="CSIT">CSIT</option>
                </select>
              </div>
              <div className="flex justify-between mt-2">
                <p>Enter Pass-out Year</p>
                <input type="text" className="text-center border w-[150px] rounded-md" name="passYear" onChange={handleChange}>
                </input>
              </div>
              <div className="flex justify-between mt-2">
                <p>Select Section</p>
                <select name="section" className="w-[150px] text-center rounded-md" onChange={handleChange}>
                <option value=""></option>
                    <option value="A" >A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
              </div>
              <div className="flex justify-center mt-5">
              <Button className="w-fit">View data</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
