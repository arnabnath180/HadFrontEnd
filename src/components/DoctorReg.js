import React, { useState } from 'react'
import TimePicker from 'react-bootstrap-time-picker';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem,  TextField ,Box,Select} from '@mui/material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
function DoctorReg() {
    const [type, setType] = useState("General");
    const [special, setSpecial] = useState("Skin & Hair");
    const [monday, setMonday] = useState(false);
    const [mondayT, setMondayT] = useState("0");
    const [mondayO, setMondayO] = useState("0");
    const [tuesday, setTuesday] = useState(false);
    const [tuesdayT, setTuesdayT] = useState("0");
    const [tuesdayO, setTuesdayO] = useState("0");
    const [wednesday, setWednesday] = useState(false);
    const [wednesdayT, setWednesdayT] = useState("0");
    const [wednesdayO, setWednesdayO] = useState("0");
    const [thursday, setThursday] = useState(false);
    const [thursdayT, setThursdayT] = useState("0");
    const [thursdayO, setThursdayO] = useState("0");
    const [friday, setFriday] = useState(false);
    const [fridayT, setFridayT] = useState("0");
    const [fridayO, setFridayO] = useState("0");
    const [saturday, setSaturday] = useState(false);
    const [saturdayT, setSaturdayT] = useState("0");
    const [saturdayO, setSaturdayO] = useState("0");
    const [sunday, setSunday] = useState(false);
    const [sundayT, setSundayT] = useState("0");
    const [sundayO, setSundayO] = useState("0");
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [ph_number, setPh_number] = useState("");
    const submit = (e) => {
        e.preventDefault();
        if (!monday && !tuesday && !wednesday && !thursday
            && !friday && !saturday && !sunday) {
            toast.error("Select Availability Time");
        }
        else {
            let timeTable = [];
            if (monday) {
                timeTable.push(
                    {
                        "day": "monday",
                        "time_in": mondayT,
                        "time_out": mondayO
                    });
            }
            if (tuesday) {
                timeTable.push(
                    {
                        "day": "tuesday",
                        "time_in": tuesdayT,
                        "time_out": tuesdayO
                    });
            }
            if (wednesday) {
                timeTable.push(
                    {
                        "day": "wednesday",
                        "time_in": wednesdayT,
                        "time_out": wednesdayO
                    });
            }
            if (thursday) {
                timeTable.push(
                    {
                        "day": "thursday",
                        "time_in": thursdayT,
                        "time_out": thursdayO
                    });
            }
            if (friday) {
                timeTable.push(
                    {
                        "day": "friday",
                        "time_in": fridayT,
                        "time_out": fridayO
                    });
            }
            if (saturday) {
                timeTable.push(
                    {
                        "day": "saturday",
                        "time_in": saturdayT,
                        "time_out": saturdayO
                    });
            }
            if (sunday) {
                timeTable.push(
                    {
                        "day": "sunday",
                        "time_in": sundayT,
                        "time_out": sundayO
                    });
            }
            let doctor = {
                "fname": fname,
                "lname": lname,
                "type": "General",
                "email": email,
                "ph_number": ph_number,
                "time_table": timeTable
            }
            if (type === "Specialist") {
                doctor.type = special;
            }
            let jwt = null;
            jwt = localStorage.getItem('adminauthenticate');
            jwt = "Bearer " + jwt;
            const config = {
                headers: {
                    'Authorization': jwt
                }
            };
            axios.post("http://localhost:8000/admin/add_doctor", doctor, config)
                .then(res => {
                    console.log(res);
                    toast.success("Doctor registered successfully");
                })
                .catch(error => {
                    toast.error('Doctor Registration Failed');
                    console.log(error.response.status);
                });
        }
    }
    
    return (
        <div style={{ background:'linear-gradient(to right,lightgrey,#33DDFB) ', minHeight: '100vh', height: '100%' }}>
               <ToastContainer style={{position:'absolute',right:'10%',top:'10%'}} />
    <AppBar position="static" style={{ background:'lightblue',marginBottom:'1%' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
       <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:'5%'
          }}
        >
          <Box
            sx={{
              width: '1000px',
              height: '100%',
              bgcolor: 'white',
              borderRadius: '20px',
              boxShadow: 20,
              marginBottom:'100px'
        
            }}
          >
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%', marginBottom: '30px' }}>
          <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' }}>
            Doctor Registration Form
          </Typography>
        </div>
      
        <form style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', marginBottom:'50px' }}  onSubmit={submit}>
            <div >
                <TextField style={{ width: 700, marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} type="text" variant="outlined" id="fname" aria-describedby="emailHelp" label="Enter first name"
                value={fname} onChange={(e)=>{setFname(e.target.value)}} required/>
            </div>
            <div >
                <TextField style={{ width: 700, marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} type="text" variant="outlined" id="lname" aria-describedby="emailHelp" label="Enter last name"
                value={lname} onChange={(e)=>{setLname(e.target.value)}} />
            </div> 
            <div >
                <TextField style={{ width: 700, marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} type="number" variant="outlined"  id="ph_number" aria-describedby="emailHelp" label="Enter phone number"
                value={ph_number} onChange={(e)=>{setPh_number(e.target.value)}} required/>
            </div>
            <div >
              <TextField style={{ width: 700, marginBottom: '30px',marginTop:'10px' ,margin: '30px', backgroundColor: 'white' }} type="email" variant="outlined"    id="exampleInputEmail1" aria-describedby="emailHelp" label="Enter email"
              value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
          </div>
          <div >
                <label for="exampleFormControlSelect1">Choose Type</label><br/>
                <select style={{ width: 700, marginBottom: '30px' ,marginTop: '0px', backgroundColor: 'lightgrey',height:'50px' }} variant="outlined" id="exampleFormControlSelect1" value={type} 
                onChange={(e)=>setType(e.target.value)}>
                    <option default>General</option>
                    <option>Specialist</option>
                </select>
            </div>
            {(type==="Specialist")?
                <div >
                    <label for="exampleFormControlSelect2">Select Specialization</label><br/>
                    <select style={{ width: 700, marginBottom: '30px' ,marginTop: '0px', backgroundColor: 'white', backgroundColor: 'lightgrey',height:'50px' }}  id="exampleFormControlSelect2" value={special}
                    onChange={(e)=>setSpecial(e.target.value)}>
                        <option default>Skin & Hair</option>
                        <option>Dental Care</option>
                        <option>Bones & Joints</option>
                        <option>Sexual Health</option>
                        <option>Child Specialist</option>
                        <option>Cancer</option>
                        <option>Kidney Issues</option>
                        <option>Heart</option>
                        <option>Brain & Nerves</option>
                        <option>Lungs & Breathing</option>
                        <option>Eye Specialist</option>
                        <option>Diabetes</option>
                        <option>Urinary Issues</option>
                        <option>Ear, Nose, Throat</option>
                        <option>Digestive Issues</option>
                    </select>
                </div>
            :""} 
            <div>
                <label for="Availability">Select Availability</label>
            </div>
            <div  style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }} >
                <input type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setMonday(true)
                    else setMonday(false)}} />
                <label  for="flexCheckDefault">
                    <h1 style={{marginLeft:'2px'}}>MONDAY</h1>
                </label>
            </div>
            {monday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }} >
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} format={24}
                value={mondayT}
                onChange={(e)=>{
                    setMondayT(e)
                }} />    
            </div>:""}
            {monday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }} >
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} format={24}  
                value={mondayO} 
                onChange={(e)=>{
                    setMondayO(e)}}/>    
            </div>:""}        
            <div style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }} >
                <input type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setTuesday(true)
                    else setTuesday(false)}}/>
                <label for="flexCheckDefault">
                <h1 style={{marginLeft:'2px'}}>TUESDAY</h1>
                </label>
            </div>
            {tuesday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }} >
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={tuesdayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setTuesdayT(t)}}/>    
            </div>:""}   
            {tuesday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={tuesdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setTuesdayO(t)}}/>    
            </div>:""}   
            <div style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <input type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setWednesday(true)
                    else setWednesday(false)}}/>
                <label  for="flexCheckDefault">
                <h1 style={{marginLeft:'2px'}}>WEDNESDAY</h1>
                </label>
            </div>
            {wednesday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={wednesdayT} format={24}
                onChange={(e)=>{
                    let t=e;
                    setWednesdayT(t)}}/>    
            </div>:""}   
            {wednesday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={wednesdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setWednesdayO(t)}}/>    
            </div>:""}   
            <div style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <input  type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setThursday(true)
                    else setThursday(false)}}/>
                <label for="flexCheckDefault">
                <h1 style={{marginLeft:'2px'}}>THURSDAY</h1>
                </label>
            </div>
            {thursday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={thursdayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setThursdayT(t)}}/>    
            </div>:""}  
            {thursday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={thursdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setThursdayO(t)}}/>    
            </div>:""}   
            <div style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <input  type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setFriday(true)
                    else setFriday(false)}}/>
                <label  for="flexCheckDefault">
                <h1 style={{marginLeft:'2px'}}>FRIDAY</h1>
                </label>
            </div>
            {friday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={fridayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setFridayT(t)}}/>    
            </div>:""}  
            {friday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={fridayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setFridayO(t)}}/>    
            </div>:""}   
            <div style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <input  type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setSaturday(true)
                    else setSaturday(false)}}/>
                <label  for="flexCheckDefault">
                <h1 style={{marginLeft:'2px'}}>SATURDAY</h1>
                </label>
            </div>
            {saturday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={saturdayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSaturdayT(t)}}/>    
            </div>:""}  
            {saturday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={saturdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSaturdayO(t)}}/>    
            </div>:""}             
            <div style={{ width: 700, marginBottom: '0px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <input type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setSunday(true)
                    else setSunday(false)}}/>
                <label for="flexCheckDefault">
                <h1 style={{marginLeft:'2px'}}>SUNDAY</h1>
                </label>
            </div>
            {sunday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={sundayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSundayT(t)}}/>    
            </div>:""}   
            {sunday?
            <div style={{ width: 700, marginBottom: '20px' ,marginTop: '0px', backgroundColor: 'white',height:'50px' }}>
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={sundayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSundayO(t)}}/>    
            </div>:""}         
            <Button  style={{width:500 ,margin:50,height:50, backgroundColor: '#CCF7FE',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }}    variant="contained" color="success"  type="submit" >Submit</Button>
        </form>  
        </Box>
        </Box>          
    </div>
  )
}

export default DoctorReg;