import axios from '../axios';




const getAllAuthors = (inputId) => {
    return axios.get(`/api/get-all-author?id=${inputId}`)
}
const createNewAuthorService = (data) => {
    return axios.post('/api/create-new-author', data)
}
const deleteAuthorService = (authorId) => {
    return axios.delete('/api/delete-author', {
        data: {
            id: authorId
        }
    });
}
const editAuthorService = (inputData) => {
    return axios.put('/api/edit-author', inputData);
}

export { getAllAuthors };
export { createNewAuthorService };
export { deleteAuthorService };
export { editAuthorService };
