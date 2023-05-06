import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import TimePicker from 'react-bootstrap-time-picker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Index() {
    
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
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        if (!monday && !tuesday && !wednesday && !thursday
            && !friday && !saturday && !sunday) {
            alert("Select Availability Time");
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
                    toast.success('Doctor Registered Successfully');
                    
                      navigate("/AdminDashboard");
                   
                   
                })
                .catch(error => {
                    console.log(error.response.status);
                });
        }
    }
    
    return (
        <div className='container'>
                 <ToastContainer style={{position:'absolute',right:'10%',top:'10%'}} />
        <form onSubmit={submit}>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="fname">First Name</label>
                <input type="text" class="form-control" id="fname" aria-describedby="emailHelp" placeholder="Enter first name"
                value={fname} onChange={(e)=>{setFname(e.target.value)}} required/>
            </div>
            <div class="form-group">
                <label for="lname">Last Name</label>
                <input type="text" class="form-control" id="lname" aria-describedby="emailHelp" placeholder="Enter last name"
                value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Choose Type</label><br/>
                <select class="form-control" id="exampleFormControlSelect1" value={type} 
                onChange={(e)=>setType(e.target.value)}>
                    <option default>General</option>
                    <option>Specialist</option>
                </select>
            </div>
            {(type==="Specialist")?
                <div class="form-group">
                    <label for="exampleFormControlSelect2">Select Specialization</label>
                    <select class="form-control" id="exampleFormControlSelect2" value={special}
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
            <div class="form-group">
                <label for="ph_number">Phone Number</label>
                <input type="text" class="form-control" id="ph_number" aria-describedby="emailHelp" placeholder="Enter phone number"
                value={ph_number} onChange={(e)=>{setPh_number(e.target.value)}} required/>
            </div>
            <div>
                <label for="Availability">Select Availability</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setMonday(true)
                    else setMonday(false)}} />
                <label class="form-check-label" for="flexCheckDefault">
                    Monday
                </label>
            </div>
            {monday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} format={24}
                value={mondayT}
                onChange={(e)=>{
                    setMondayT(e)
                }} />    
            </div>:""}
            {monday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} format={24}  
                value={mondayO} 
                onChange={(e)=>{
                    setMondayO(e)}}/>    
            </div>:""}        
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setTuesday(true)
                    else setTuesday(false)}}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Tuesday
                </label>
            </div>
            {tuesday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={tuesdayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setTuesdayT(t)}}/>    
            </div>:""}   
            {tuesday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={tuesdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setTuesdayO(t)}}/>    
            </div>:""}   
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setWednesday(true)
                    else setWednesday(false)}}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Wednesday
                </label>
            </div>
            {wednesday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={wednesdayT} format={24}
                onChange={(e)=>{
                    let t=e;
                    setWednesdayT(t)}}/>    
            </div>:""}   
            {wednesday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={wednesdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setWednesdayO(t)}}/>    
            </div>:""}   
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setThursday(true)
                    else setThursday(false)}}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Thursday
                </label>
            </div>
            {thursday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={thursdayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setThursdayT(t)}}/>    
            </div>:""}  
            {thursday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={thursdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setThursdayO(t)}}/>    
            </div>:""}   
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setFriday(true)
                    else setFriday(false)}}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Friday
                </label>
            </div>
            {friday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={fridayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setFridayT(t)}}/>    
            </div>:""}  
            {friday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={fridayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setFridayO(t)}}/>    
            </div>:""}   
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setSaturday(true)
                    else setSaturday(false)}}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Saturday
                </label>
            </div>
            {saturday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={saturdayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSaturdayT(t)}}/>    
            </div>:""}  
            {saturday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={saturdayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSaturdayO(t)}}/>    
            </div>:""}             
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                onChange={(e)=>{
                    if(e.target.checked)setSunday(true)
                    else setSunday(false)}}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Sunday
                </label>
            </div>
            {sunday?
            <div class="form-group">
                <label for="Pick Time in">Pick Time in</label>
                <TimePicker start="00:00" end="23:59" step={30} value={sundayT} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSundayT(t)}}/>    
            </div>:""}   
            {sunday?
            <div class="form-group">
                <label for="Pick Time out">Pick Time out</label>
                <TimePicker start="00:00" end="23:59" step={30} value={sundayO} format={24} 
                onChange={(e)=>{
                    let t=e;
                    setSundayO(t)}}/>    
            </div>:""}         
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>            
    </div>
  )
}

