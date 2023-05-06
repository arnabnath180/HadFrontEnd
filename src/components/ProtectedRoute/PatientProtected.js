import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PatientProtected = ({
    redirectPatient = "/PatientLogin",
  }) => {
    const isPatientAuthenticated = useSelector(state => state.patient.patientLogin);
    console.log(isPatientAuthenticated);
    if (!isPatientAuthenticated) {
        return <Navigate to={redirectPatient} />
    }

    return <Outlet/>
}

export default PatientProtected;