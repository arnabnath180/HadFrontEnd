import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    isAdminAuthenticated,
    isPatientAuthenticated,
    isDoctorAuthenticated,
    redirectAdmin = "/Adminlogin",
    redirectPatient = "/PatientLogin",
    redirectDoctor = "/DoctorLogin",
    
}) => {
    if (!isAdminAuthenticated) {
        return <Navigate to={redirectAdmin} />;
    }

    if (!isPatientAuthenticated) {
        return <Navigate to={redirectPatient} />
    }

    if (!isDoctorAuthenticated) {
        return <Navigate to={redirectDoctor} />
    }

    return <Outlet/>
}

export default ProtectedRoute;