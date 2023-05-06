import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorServices from '../services/DoctorServices';
import { Button,Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setJoiningPatient } from './Redux/DoctorSlice';
import { createChannel, createClient } from 'agora-rtm-react'


import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { setInRoom } from './Redux/PatientSlice';
import Header from './Header';

export default function () {
  let jwt=null;
  jwt=localStorage.getItem('doctorauthenticate');
  jwt="Bearer "+jwt;
  const config = {
      headers:{
          'Authorization':jwt
      }
  };
  const [patients,setPatients]=useState([]);
  const patientCount=useSelector(state => state.doctor.patientCount);
  const doctorId=useSelector(state=>state.doctor.doctorId);
  let APP_ID="7ce97bbc3ec1405ca54c724c87817be4";
  let token=null;
  const doctorEmail = useSelector(state => state.doctor.doctorEmail);
  let uid=String(doctorEmail);
  console.log(uid);
  let channel;
  let client;
  const useClient = createClient(APP_ID);
  const useChannel = createChannel(doctorEmail);
  client = useClient(); 
  channel = useChannel(client);
  let init=async(id)=>{
    await client.login({ uid,token })
    await channel.join()   
    await client.sendMessageToPeer({text:JSON.stringify({'type':'join','response':"join",'email':doctorEmail})},String(id));
    await channel.leave();
    await client.logout();
  }
  
  useEffect(()=>{
    DoctorServices.getQueue(doctorId, config).then(res=>{
      console.log(res);
      setPatients([...(res.data)]);
    });
  },[patientCount]);
  

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const join = async (id) => {
    await init(id);
    dispatch(setInRoom(true));
    navigate('/DocChat',{state:id});
  }
  return (
    <div>
      <div style={{background: ' linear-gradient(to right,lightgrey,#33DDFB) ', height: '100%',minHeight:'100vh'}}>
      <Header />
       <table className="table">
        <tbody>
        {
          patients.map((patient)=>  
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'5%',
               
              }}
            >
              <Box
                sx={{
                  width: '1000px',
                  height: '100px',
                  bgcolor: 'white',
                  borderRadius: '20px',
                  boxShadow: 20,
                  padding:'20px'
    
                }}
              >
            <tr>
              <td>{patient.fname} </td>
              <td> 
                <Button style={{color:'black',backgroundColor:'gray',marginLeft:'750px'}} type="button"  onClick={()=>join(patient.patient_id)}>Join</Button>
              </td>
            </tr>
            </Box>
            </Box>
          )
        }
        </tbody>
      </table>
      <ToastContainer/>
      </div>
    </div>
  )
}


    
//   return (
//     <div>
      
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">Patient</th>
//             <th scope="col">Join</th>
//           </tr>
//         </thead>
//         <tbody>
//         {
//           patients.map((patient)=>  
//             <tr>
//               <td>{patient.patient_id} </td>
//               <td> 
//                 <Button style={{color:'black',backgroundColor:'gray'}} type="button" className="btn bg-blue-500" onClick={()=>join(patient.patient_id)}>Join</Button>
//               </td>
//             </tr>
//           )
//         }
//         </tbody>
//       </table>
//       <ToastContainer/>
//     </div>
//   )
// }
  