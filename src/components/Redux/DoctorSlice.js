import { createSlice } from "@reduxjs/toolkit";

const storedDoctorLogin = localStorage.getItem('doctorLogin');
const initialDoctorLogin = storedDoctorLogin ? JSON.parse(storedDoctorLogin) : false;

const storedDoctorId = localStorage.getItem('doctorId');
const initialDoctorId = storedDoctorId ? JSON.parse(storedDoctorId) : null;

const storedDoctorEmail = localStorage.getItem('doctorEmail');
const initialDoctorEmail = storedDoctorEmail ? JSON.parse(storedDoctorEmail) : null;



const DoctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctorLogin: initialDoctorLogin,
    doctorId: initialDoctorId,
    doctorEmail:initialDoctorEmail,
    patientCount:0,
    joiningPatient:0,
    doctorChannel:false,
    patientId:null
  },
  reducers: {
    setdoctorLogin: (state, action) => {
      state.doctorLogin = action.payload;
    },
    setdoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    setdoctorEmail: (state, action) => {
      state.doctorEmail = action.payload;
    },
    setPatientCount:(state) => {
      state.patientCount += 1;
    },
    setJoiningPatient:(state, action) => {
      state.joiningPatient = action.payload;
    },
    setDoctorChannel:(state, action) => {
      state.doctorChannel = action.payload;
    },
    setPatientId:(state, action) => {
      state.patientId = action.payload;
    },
    
  }
});

export const {setPatientId, setdoctorLogin, setdoctorId, setdoctorEmail, setPatientCount, setJoiningPatient, setDoctorChannel } = DoctorSlice.actions;
export default DoctorSlice.reducer;
