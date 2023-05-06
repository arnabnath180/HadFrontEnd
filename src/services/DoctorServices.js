import axios from "axios";

const BASE_URL = "http://16.16.159.45:8000/patient/register";

class DoctorService {
    logindoctor(doctor) {
        return axios.post("http://16.16.159.45:8000/doctor/login", doctor);
    }
    
    forgotpassword(doctor) {
        return axios.post("http://16.16.159.45:8000/doctor/forgot_password", doctor);
    }
    updatepassword(doctr) {
        return axios.patch("http://16.16.159.45:8000/doctor/reset_password", doctr);
   }
   addToQueue(data, config){
        return axios.post("http://16.16.159.45:8000/doctor/add_to_queue", data, config);
   }
   getQueue(id, config){
        return axios.get(`http://16.16.159.45:8000/doctor/get_queue/${id}`, config);
   }

   deleteQueue(id, config){
        return axios.delete(`http://16.16.159.45:8000/doctor/delete_doctor/${id}`, config);
   }

   addPrescription(data, config){
        return axios.post("http://16.16.159.45:8000/doctor/uploadprescription", data, config);
   }

   deleteQueuePatient(id, config){
     return axios.delete(`http://16.16.159.45:8000/doctor/delete_from_queue/${id}`, config);
  }
  updateHistory(history,config){
     return axios.post('http://16.16.159.45:8000/doctor/updateHistory',history,config);
  }
  viewHistory(config) {
     return axios.get('http://16.16.159.45:8000/doctor/getHistory',config);
  }
   
  getImageName(config,id) {
     return axios.get(`http://16.16.159.45:8000/doctor/medicalRecords/${id}`,config);
  }
}

export default new DoctorService();
