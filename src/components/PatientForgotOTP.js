import React from 'react'
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import OtpInput from 'otp-input-react';
//import OtpInput from 'otp-input-react';
import { useState } from 'react';
import {CgSpinner} from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import UpdatePatientPassword from './UpdatePatientPassword';
import Header from './Header';
import { TextField, Button, Link, AppBar, Toolbar, Typography,Box } from '@mui/material';

const PatientForgotOTP = () => {
    const [otp,setOtp] = useState("");
    const [ph,setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
        
         function onCaptchVerify(){
          if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
              'size': 'invisible',
              'callback': (response) => {
                onSignup()
              },
              'expired-callback': () => {}
            }, auth);
          }
         }
   
         function onSignup(){
          setLoading(true)
          onCaptchVerify()
   
             const appVerifier = window.recaptchaVerifier
            
             const formatph = '+' + ph
             
          signInWithPhoneNumber(auth, formatph, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
   
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success('OTP sent successfully!');
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
         
          setLoading(false);
        });
         }
   
         
         function onOTPVerify(){
          setLoading(true);
          window.confirmationResult.confirm(otp).then(async(res)=>{
            console.log(res);
              setUser(res.user);
              // <UpdatePatientPassword phone={ph} />
              let result=ph.substr(2,10);
           
            navigate("/ForgotPassword",{state:result});
            setLoading(false);
          }).catch(err=>{
            console.log(err);
            setLoading(false);
          })
         }

         return (
          <>
                <div style={{background:'linear-gradient(to right,lightgrey,#33DDFB) ',minHeight: '100vh',height:'100%'}}>
                
                <Header />
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
                        width: '40%',
                        height: '600px',
                        bgcolor: 'lightblue',
                        borderRadius: '20px',
                        boxShadow: 20,
                  
                      }}
                    >
                  
          
                     <div style={{marginTop:'20%'}}>
                      <Toaster toastOptions={{duration: 4000}} />
                      <div id='recaptcha-container'></div>
                      {    
                        user ?       (      <h2 className='text-center text-white font-medium text-2xl'>
                        Login Success
                    </h2>   ) :   (
                     
                      <div >
                     <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,display:'flex',flexDirection:'center',justifyContent:'center',marginTop:'5%'}}>
                      OTP VERIFICATION
                    </Typography>
          
                     { showOTP ?
                     <>
                       <div style={{marginLeft:'45%',marginTop:'8%'}}>
                           <BsFillShieldLockFill size={30} />
                       </div>
                       <label style={{marginLeft:'40%',color:'black',marginTop:'2%'}} htmlFor="otp" >
                        Enter Your OTP
                       </label>
                       <OtpInput style={{marginLeft:'30%',marginTop:'10%',color:'black'}}value={otp} onChange={setOtp} OTPLength = {6} otpType="number" disabled={false} autoFocus ></OtpInput>
                       <Button style={{marginLeft:'40%',marginTop:'8%',backgroundColor:'#33DDFB',color:'black'}} onClick={onOTPVerify} type="submit" variant="contained" color="primary"  >
                        {
                          loading &&  <CgSpinner size={20} className='mt-1 animate-spin'/>
                        }
                       
                        <span>Verify OTP</span>
                       </Button>
                       </> :
                       
                       
          
                       <>
                       <div style={{marginLeft:'45%',marginTop:'3%'}} >
                           <BsTelephoneFill size={30} />
                       </div>
                       <label style={{marginLeft:'38%',marginTop:'3%'}}htmlFor="">
                        Verify your phone number
                       </label>
                      <PhoneInput style={{marginLeft:'30%'}} country={'in'} value={ph} onChange={setPh} className='' ></PhoneInput> 
                       <Button style={{marginLeft:'38%',marginTop:'5%',backgroundColor:'#33DDFB',color:'black'}} onClick={onSignup} type="submit" variant="contained" color="primary" >
                        {
                          loading &&  <CgSpinner size={20} className='mt-1 animate-spin'/>
                        }
                       
                        <span>Send code via SMS</span>
                       </Button>
                       </>
          
          }
          
                      </div>
                    )
                      }
          
                     </div>
                  
               
               </Box>
               </Box>
               </div>
               </>
            )
          }

export default PatientForgotOTP
