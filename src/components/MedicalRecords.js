import React, { useEffect, useState } from 'react';
import PatientServices from '../services/PatientServices';
import axios from 'axios';
import { Button, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import Modal from '@mui/material/Modal';

const MedicalRecords = () => {
  const [imageSrc, setImageSrc] = useState([]);
  const [enlargedSrc, setEnlargedSrc] = useState(null);
  let jwt = null;
  jwt = localStorage.getItem('patientauthenticate');
  jwt = 'Bearer ' + jwt;
  const config = {
    headers: {
      Authorization: jwt,
    },
  };
  const fetchData = async () => {
    try {
      const response = await PatientServices.getImageName(config);
      var count = Object.keys(response.data).length;
      console.log(count);
      if (count == 0) {
        toast.error('No Medical Records Present');
      }
      response.data.map((e) => {
        let url = 'assests/' + e;
        setImageSrc((current) => [...current, url]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImg = (e) => {
    let imgname = e.substr(8);
    console.log(imgname);
    PatientServices.deleteImage(config, imgname)
      .then((response) => {
        console.log(response);
        let l = [...imageSrc];
        let filterL = l.filter(function (elem) {
          return elem !== e;
        });
        setImageSrc(filterL);
        toast.success('Record Deleted Successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Record Deletion Failed');
      });
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
      <div style={{ background: 'linear-gradient(to right,lightgrey,#33DDFB) ', height: '100%', minHeight: '100vh' }}>
        <Header />
        <ToastContainer style={{position:'absolute',right:'10%',top:'10%'}} />
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
                  style={{ width: '40%', height: '200px', cursor: 'pointer' }}
                  src={e}
                  alt=""
                  onClick={() => setEnlargedSrc(e)}
                />
                <Button
                  style={{ width: '10%', height:'30%',backgroundColor:'black',color:'white'}}
                  variant="contained"
                  onClick={() => { deleteImg(e) }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </Stack>
        </div>
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
    </>
  );
  
  
          }

export default MedicalRecords