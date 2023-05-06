import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorProtected = ({
    redirectDoctor = "/DoctorLogin",
}) => {
    const isDoctorAuthenticated = useSelector(state => state.doctor.doctorLogin);
    console.log(isDoctorAuthenticated);
    if (!isDoctorAuthenticated) {
        return <Navigate to={redirectDoctor} />
    }

    return <Outlet/>
}

export default DoctorProtected;