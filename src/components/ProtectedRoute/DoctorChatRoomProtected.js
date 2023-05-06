import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorChatRoomProtected = ({
    redirectDoctor1 = "/DoctorLogin",
    redirectDoctor2 = '/DoctorDashboard'
    
  }) => {
    const isDoctorAuthenticated = useSelector(state => state.doctor.doctorLogin);
    const inRoom = useSelector(state => state.patient.inRoom);
   // console.log(isPatientAuthenticated);
    if (!isDoctorAuthenticated) {
        return <Navigate to={redirectDoctor1} />
    }
    else if(!inRoom) {
        return <Navigate to={redirectDoctor2} />
    }

    return <Outlet/>
}

export default DoctorChatRoomProtected;