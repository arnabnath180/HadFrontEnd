import { createSlice } from "@reduxjs/toolkit";

const storedAdminLogin = localStorage.getItem('adminLogin');
const initialAdminLogin = storedAdminLogin ? JSON.parse(storedAdminLogin) : false;


const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    AdminLogin: initialAdminLogin,
    AdminId: null
  },
  reducers: {
    setAdminLogin: (state, action) => {
      state.AdminLogin = action.payload;
    },
    setAdminId: (state, action) => {
      state.doctorId = action.payload;
    }
  }
});

export const { setAdminLogin, setAdminId } = AdminSlice.actions;
export default AdminSlice.reducer;
