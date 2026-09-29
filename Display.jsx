import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

//<h2 key={index} className='border inline'>{item.rollNumber}</h2>


const Display = () => {
  
  const location = useLocation()
  const data = location.state
  console.log(data)
  if(data==null){
    return(
      <h1>NO Data</h1>
    )
  }else{
    return (
      <div className='flex justify-center' >
      <div className='flex flex-wrap gap-11 mx-10 my-5 justify-center'>
        {
          data.map((item,index)=>(
            <Link  key={index} to={`/display/${item.rollNumber}`}>
            <Card className="hover:border-black hover:cursor-pointer hover:bg-gray-100 hover:translate-y-1 hover:translate-x-1 md:w-[300px] flex-1 min-w-[30%] bg-[#d5cfca8e]">
              <CardHeader>
                <CardTitle className="text-md text-center">{item.rollNumber}</CardTitle>
                <CardDescription><p className='text-center'>{item.name}</p></CardDescription>
              </CardHeader>
            </Card>
            </Link>
          ))
        }
      </div>
      </div>
    )
  }
  //data.map((ele)=>{
  //  console.log(ele)
  //})

}

export default Display