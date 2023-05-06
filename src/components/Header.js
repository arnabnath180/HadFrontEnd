import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
const Header = () => {
  return (
    <div>
       <AppBar position="static" style={{ background: 'lightblue' }}>
        <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <img  style={{ marginLeft: '40%', maxWidth: '20%', height: 'auto'}}  src='logo.png' alt='e-mantrana'></img>
         </Typography>
        </Toolbar>
       </AppBar>
    </div>
  )
}

export default Header;