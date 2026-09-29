import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [formData,setFormData] = useState({
        department:'',
        passOutYear:'',
        section:'',
        rollNumber:'',
        name:'',
    })

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData({
            ...formData,
            [name]:value.toUpperCase(),
        })
    }

    const handleUsername = (e)=>{setUsername((e.target.value).toUpperCase())}
    const handlePassword = (e)=>{setPassword((e.target.value).toUpperCase())}



    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/api/register',{username,password,formData})
        .then(response=>{
            console.log(response)
        }).catch(e=>{console.log(e)})
    }


  return (
    <div className='flex-col'>
        <h1>Register</h1>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='username' required={true} onChange={handleUsername} uppercase="true" />
            <input type='password' placeholder='password' required={true} onChange={handlePassword} />
            <input type="text" placeholder='Name' name='name' required={true} onChange={handleChange} uppercase="true"/>
            <input type="text" placeholder='Department' name='department' required={true} onChange={handleChange} uppercase="true" />
            <input type="text" name="passOutYear" id="" required= {true} placeholder='passOutYear' onChange={handleChange} />
            <input type="text" name="section" id=""  required={true} placeholder='section' onChange={handleChange} uppercase="true" />
            <input type="text" name="rollNumber" id=""  required={true} placeholder='rollnumber' onChange={handleChange} uppercase="true"/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Register