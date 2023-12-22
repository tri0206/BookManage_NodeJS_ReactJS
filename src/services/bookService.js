import axios from '../axios';




const getAllBooks = (inputId) => {
    return axios.get(`/api/get-all-books?id=${inputId}`)
}
const createNewBookService = (data) => {
    return axios.post('/api/create-new-book', data)
}
const deleteBookService = (bookId) => {
    return axios.delete('/api/delete-book', {
        data: {
            id: bookId
        }
    });
}
const editBookService = (inputData) => {
    return axios.put('/api/edit-Book', inputData);
}

export { getAllBooks };
export { createNewBookService };
export { deleteBookService };
export { editBookService };
