import React, { useEffect, useState } from 'react'
import PatientServices from '../services/PatientServices';
import axios from 'axios';
import { Button, Stack,Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import DoctorServices from '../services/DoctorServices';

const ViewRecords = ({pid}) => {
    
    const [imageSrc, setImageSrc] = useState([]);
    const [enlargedSrc, setEnlargedSrc] = useState(null);
    let jwt=null;
            jwt=localStorage.getItem('doctorauthenticate');
            jwt="Bearer "+jwt;
            const config = {
            headers:{
                'Authorization':jwt
            }
            };
    const fetchData = async () => {
        try {
             
          const response = await DoctorServices.getImageName(config,pid);
          console.log(response);
         // var count = Object.keys(response.data).length;
         // console.log(count);
         // if (count == 0) {
         //   toast.error('No Medical Records Present');
         // }
         // console.log(response);
            response.data.map((e) => {
             //   console.log(e);
                let url = "assests/" + e;
             //  console.log(url);
                setImageSrc(current => [...current, url]);
                    
            })
        }
        catch (error) { 
            console.log(error);
        }
    };
    useEffect(() => {
        
        fetchData();
        
    }, []);
    
    console.log(imageSrc);
    const handleImageClick = (url) => {
        setEnlargedSrc(url);
      };
    
      const handleCloseModal = () => {
        setEnlargedSrc(null);
      };
    return (

      <>
        <div style={{ background: 'linear-gradient(to right,lightgrey,#33DDFB) ', height: '100%', minHeight: '400vh' }}>
          <Header />
           
           <Typography variant="h4" component="h4" gutterBottom style={{ color: 'black' ,display:'flex',flexDirection:'center',justifyContent:'center',marginTop:'5%'}}>
             MEDICAL RECORDS
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Stack spacing={2} style={{ width: '70%' }}>
              {imageSrc.map((e) => (
    
             <div
            
            style={{
              border: '1px solid black',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor:'lightgray',
              marginTop:'2%'}}>
              
            
              <img
                  style={{ width: '100%', height: '200px', cursor: 'pointer' }}
                  src={e}
                  alt=""
                  onClick={() => setEnlargedSrc(e)}
                />
    
      
          
    </div>
  ))}
              </Stack>
              {enlargedSrc && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => setEnlargedSrc(null)}
          >
            <img
              src={enlargedSrc}
              alt=""
              style={{ maxWidth: '80%', maxHeight: '80%', cursor: 'pointer' }}
            />
          </div>
        )}
     </div>       
    </div>     
</>

  )
}

export default ViewRecords