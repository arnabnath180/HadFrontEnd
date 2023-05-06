import Home from './components/Home';
import './App.css';
import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PatientRegistration from './components/PatientRegistration';
import DoctorLogin from './components/DoctorLogin';
import PatientLogin from './components/PatientLogin';
import OTPVerification from './components/OTPVerification';
import PatientDashboard from './components/PatientDashboard';
import UpdatePatientPassword from './components/UpdatePatientPassword';
import PatientForgotOTP from './components/PatientForgotOTP';
import DoctorDashboard from './components/DoctorDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import DoctorList from './components/AvailableDoctor.js';
import DoctorQueue from './components/DoctorQueue';
import PatChat from './components/ChatRoom/PatChat.js';
import DocChat from './components/ChatRoom/DocChat.js';
import Chat from './components/ChatRoom/Index.js';
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import DoctorReg from './components/DoctorReg' 
import DoctorDetails from './components/Admin/DoctorDetails/Index.js'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MedicalRecords from './components/MedicalRecords';
import HealthRecord from './components/HealthRecord';
import AdminProtected from './components/ProtectedRoute/AdminProtected';
import DoctorProtected from './components/ProtectedRoute/DoctorProtected';
import PatientProtected from './components/ProtectedRoute/PatientProtected';
import EditProfilePage from './components/EditProfilePage';
import PatientChatRoomProtected from './components/ProtectedRoute/ChatRoomProtected';
import DoctorChatRoomProtected from './components/ProtectedRoute/DoctorChatRoomProtected';
import ViewHistory from './components/ViewHistory';


function App() {
  // const {
  //   isAdminAuthenticated,
  //   isPatientAuthenticated,
  //   isDoctorAuthenticated
  // } = useSelector((state) => state.root);

  //const { isAdminAuthenticated } = useSelector((state) => state.admin);
 // const { isPatientAuthenticated } = useSelector((state) => state.patient);
  //const { isDoctorAuthenticated } = useSelector((state) => state.doctor);
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/VerifyOTP' element={<OTPVerification />}></Route>
          <Route path='/PatientRegistration' element={<PatientRegistration />}></Route> 
          <Route path="/DoctorForgotPassword" element={<ForgotPassword/>} ></Route>
          <Route path='/ForgotPassword' element={<UpdatePatientPassword />}></Route> 
          <Route path='/VerifyForgotOtp' element={<PatientForgotOTP />}></Route>
          <Route path='/DoctorLogin' element={<DoctorLogin />}></Route> 
          <Route path="/doctor_reset_password" element={<ResetPassword />} ></Route>
          <Route path='/PatientLogin' element={<PatientLogin />}></Route>  
          <Route path='/AdminLogin' element={<AdminLogin />}></Route>
          
          
          <Route element={<AdminProtected />}>
                  <Route path='/AdminDashboard' element={<AdminDashboard />}></Route>
                  <Route path='/DoctorReg' element={<DoctorReg />}></Route>
                  <Route path='/admin/doctordetails' element={<DoctorDetails />}></Route>
          </Route>

          <Route element={<DoctorProtected />}>
                  <Route path='/DoctorDashboard' element={<DoctorDashboard />}></Route> 
                  <Route path='/DoctorQueue' element={<DoctorQueue />}></Route>
                  <Route path='/viewHistory' element={<ViewHistory />}></Route>
          </Route>

          <Route element={<PatientProtected />}>
                  <Route path='/PatientDashboard' element={<PatientDashboard />}></Route>
                  <Route path="/patient/getall" element={<DoctorList />} ></Route>
                  <Route path='/MedicalList' element={<MedicalRecords />}></Route>
                  <Route path='/health-record' element={<HealthRecord />} ></Route>
                  <Route path='/editPatientProfile' element={<EditProfilePage/>} ></Route>
         </Route>
         <Route>
               <Route path='/chat' element={<Chat />}></Route>
         </Route>
         <Route element={< PatientChatRoomProtected/>}>
                <Route path='/PatChat' element={<PatChat />}></Route>
         </Route>
         <Route element={< DoctorChatRoomProtected/>}>
              <Route path='/DocChat' element={<DocChat />}></Route>
         </Route>
         


         
         

                      {/* <Route path="/doctor_reset_password" element={<ResetPassword />} render={(props) => (
                <ResetPassword token={new URLSearchParams(props.location.search).get("token")} />
            )} /> */}


    </Routes>
    </BrowserRouter>  
  </> 
  );
}

export default App;
