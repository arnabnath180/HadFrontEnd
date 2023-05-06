// import { createReducer } from "@reduxjs/toolkit";

// const InitialState = {
//     adminLogin: false,
//     patientLogin: false,
//     doctorLogin: false
// }

// export const adminReducer = createReducer(InitialState, {
//     adminLogin: (state) => {
//         state.adminLogin = true;
//     },
//     adminLogout: (state) => {
//         state.adminLogin = false;
//     },
//     adminId: (state, action) => {
//         state.adminId = action.payload;
//     }
// });

// export const patientReducer = createReducer(InitialState, {
    
//     patientLogin: (state) => {
//         state.patientLogin = true;
//     },
//     patientLogout: (state) => {
//         state.patientLogin = false;
//     },
//     patientId: (state, action) => {
//         state.patientId = action.payload;
//     }
// });
// export const doctorReducer = createReducer(InitialState, {
    
//     doctorLogin: (state) => {
//         state.doctorLogin = true;
//     },
//     doctorLogout: (state) => {
//         state.doctorLogin = false
//     },
//     doctorId: (state, action) => {
//         state.doctorId = action.payload
//     }
// })

import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./AdminSlice";
import patientReducer from "./PatientSlice";
import doctorReducer from "./DoctorSlice";

const rootReducer = combineReducers({
  admin: adminReducer,
  patient: patientReducer,
  doctor: doctorReducer
});

export default rootReducer;

