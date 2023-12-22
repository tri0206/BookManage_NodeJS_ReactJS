import axios from '../axios';


const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllReaders = (inputId) => {
    return axios.get(`/api/get-all-readers?id=${inputId}`)
}
const createNewReaderService = (data) => {
    return axios.post('/api/create-new-reader', data)
}
const deleteReaderService = (readerId) => {
    return axios.delete('/api/delete-reader', {
        data: {
            id: readerId
        }
    });
}
const editReaderService = (inputData) => {
    return axios.put('/api/edit-reader', inputData);
}
export { handleLoginApi };
export { getAllReaders };
export { createNewReaderService };
export { deleteReaderService };
export { editReaderService };
