// import { configureStore } from "@reduxjs/toolkit";
// import {adminReducer,patientReducer,doctorReducer  } from "./RootReducer";

// const store = configureStore({
//     reducer: {
//         admin: adminReducer,
//         patient: patientReducer,
//         doctor:doctorReducer,
//     }
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
