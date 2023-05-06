import axios from "axios";

const BASE_URL = "http://16.16.159.45:8000/patient/register";

class PatientService {
    savePatient(patient) {
        return axios.post(BASE_URL, patient);
    }

    loginPatient(patient) {
        return axios.post("http://16.16.159.45:8000/patient/login", patient);
     }

    updatePassword(update) {
        return axios.patch("http://16.16.159.45:8000/patient/updatePatientPassword", update);
    }
    getAvailableDoctor(data, config){        
        return axios.post("http://16.16.159.45:8000/patient/getall", data, config); 
    }

        getImageName(config) {
        return axios.get("http://16.16.159.45:8000/patient/medicalRecords", config);
     }
    
    getImage(url,config) { 
        return axios.get(url,config);
    }

    deleteImage(config,img){
        return axios.delete("http://localhost:8000/patient/deleteRecord/"+img,config);
    }

        updatepatientprofile(patient, config) {
        return axios.patch("http://16.16.159.45:8000/patient/updateProfile", patient, config);
    }
    
}

export default new PatientService();