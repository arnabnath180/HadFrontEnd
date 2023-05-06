import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatRoomProtected = ({
    redirectPatient1 = "/PatientLogin",
    redirectPatient2 = "/PatientDashboard"
    
  }) => {
    const isPatientAuthenticated = useSelector(state => state.patient.patientLogin);
    const inRoom = useSelector(state => state.patient.inRoom);
   // console.log(isPatientAuthenticated);
    if (!isPatientAuthenticated) {
        return <Navigate to={redirectPatient1} />
    }
    else if(!inRoom) {
        return <Navigate to={redirectPatient2} />
    }

    return <Outlet/>
}

export default ChatRoomProtected;