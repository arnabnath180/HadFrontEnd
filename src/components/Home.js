import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import Footer from './Footer';
import { Box } from '@mui/material';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: 'lightgrey',
    color: 'black',
    fontSize: '1rem',
    fontWeight: 'bold',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',

    
  },
  info: {
    position: 'absolute',
    right: '-100%',
    top: '50%',
    transform: 'translateY(-50%)',
    whiteSpace: 'nowrap',
    animationName: 'move',
    animationDuration: '20s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
 
};

const keyframes = `
@keyframes move {
  from {
    right: -100%;
  }
  to {
    right: 100%;
  }
}
`;

function Home() {
  const [info, setInfo] = useState('Emantrana is on a mission to make quality healthcare affordable and accessible. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions.');

  const navigate = useNavigate();

  return (
    <div style={{background:'linear-gradient(to right,lightgrey,#33DDFB) ', minHeight: '100vh',height:'100%'}}>
      <Header />
      <div style={styles.header}>
        <style>{keyframes}</style>
        <div style={styles.info}>{info}</div>
      </div>
      <div style={{ display: 'flex' }}>
      <img src="./backimage.jpg" alt="A description of the image"  style={{width:'50%',minHeight:'100vh',height:'100%', opacity:0.2}}/>
         <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'right',
            marginTop:'2%',
            marginRight:'2%',
            marginLeft:'2%',
            opacity: 0.8
          }}
        >
          <Box
            sx={{
              width: '800px',
              height: '80%',
              borderRadius: '20px',
              boxShadow: 20,
              background:'lightblue'
        
            }}
          >
           
      <div style={{ display: 'flex', flexDirection:'column', alignItems:'center',marginTop:'10%'}} >
        <Button  onClick={()=>{navigate("/VerifyOTP")}} style={{width:400 ,margin:50,height:50, backgroundColor: 'white',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"><h2>Patient registration</h2></Button>
        <Button  onClick={()=>{navigate("/PatientLogin")}} style={{width:400,margin:50,height:50,backgroundColor: 'white',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"><h2>Patient login</h2></Button>
        <Button  onClick={()=>{navigate("/DoctorLogin")}} style={{width:400 ,margin:50,height:50,backgroundColor: 'white',color:'black',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 25 }} variant="contained" color="success"><h2>Doctor Login</h2></Button>
      </div>  
      </Box> 
      </Box>
      </div>
     
      </div>
  );
}

export default Home;