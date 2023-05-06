import { createSlice } from "@reduxjs/toolkit";

const storedPatientLogin = localStorage.getItem('patientLogin');
const initialPatientLogin = storedPatientLogin ? JSON.parse(storedPatientLogin) : false;

const storedPatientId = localStorage.getItem('patientId');
const initialPatientId = storedPatientId ? JSON.parse(storedPatientId) : null;

const storedPatientFname = localStorage.getItem('patientFname');
const initialPatientFname = storedPatientFname ? JSON.parse(storedPatientFname) : null;

const storedPatientLname = localStorage.getItem('patientLname');
const initialPatientLname = storedPatientLname ? JSON.parse(storedPatientLname) : null;

const storedPatientDOB = localStorage.getItem('patientDOB');
const initialPatientDOB = storedPatientDOB ? JSON.parse(storedPatientDOB) : null;


const PatientSlice = createSlice({
  name: "patient",
  initialState: {
    patientLogin: initialPatientLogin,
    patientId:initialPatientId,
    patientInQueue:null,
    patientFname: initialPatientFname,
    patientLname: initialPatientLname,
    patientDOB: initialPatientDOB,
    inRoom:false
  },
  reducers: {
    setpatientLogin: (state, action) => {
      state.patientLogin = action.payload
    },
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    setpatientInQueue: (state,action) => {
      state.patientInQueue = action.payload;
    },
    setPatientFname: (state, action) => {
      state.patientFname = action.payload;
    },
    setPatientLname: (state, action) => {
      state.patientLname = action.payload;
    },
    setPatientDOB: (state, action) => {
      state.patientDOB = action.payload;
    },
    setInRoom: (state,action) => {
      state.inRoom = action.payload;
    }
  }
});

export const { setpatientLogin, setPatientId, setpatientInQueue, setInRoom, setPatientDOB, setPatientFname, setPatientLname  } = PatientSlice.actions;
export default PatientSlice.reducer;
