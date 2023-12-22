import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { getAllAuthors, createNewAuthorService, deleteAuthorService, editAuthorService } from '../../services/authorService'
import { getAllAuthors, createNewAuthorService, deleteAuthorService, editAuthorService } from '../../services/authorService';
import './AuthorManage.scss'
import ModalAuthor from './ModalAuthor';
import ModalEditAuthor from './ModalEditAuthor';
import { emitter } from "../../utils/emitter";
class AuthorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrAuthors: [],
            isOpenModalAuthor: false,
            isOpenModalEditAuthor: false,
            authorEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllAuthorsFromReact();
    }
    getAllAuthorsFromReact = async () => {
        let response = await getAllAuthors('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrAuthors: response.authors
            })

        }
    }
    handleAddNewAuthor = () => {
        this.setState({
            isOpenModalAuthor: true,
        })
    }

    toggleAuthorModal = () => {
        this.setState({
            isOpenModalAuthor: !this.state.isOpenModalAuthor,
        })
    }
    toggleAuthorEditModal = () => {
        this.setState({
            isOpenModalEditAuthor: !this.state.isOpenModalEditAuthor,
        })
    }
    createNewAuthor = async (data) => {
        try {
            let response = await createNewAuthorService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllAuthorsFromReact();
                this.setState({
                    isOpenModalAuthor: false
                })
                alert(response.message);
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteAuthor = async (author) => {
        try {
            let res = await deleteAuthorService(author.id);
            if (res && res.errCode === 0) {
                await this.getAllAuthorsFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditAuthor = (author) => {
        this.setState({
            isOpenModalEditAuthor: true,
            AuthorEdit: author
        })
    }
    doEditAuthor = async (author) => {
        try {

            let res = await editAuthorService(author);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditAuthor: false
                })
                alert(res.message);
                await this.getAllAuthorsFromReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        let arrAuthors = this.state.arrAuthors;
        return (
            <div className="authors-container">
                <ModalAuthor
                    isOpen={this.state.isOpenModalAuthor}
                    toggleFromParent={this.toggleAuthorModal}
                    createNewAuthor={this.createNewAuthor}
                >
                </ModalAuthor>
                {this.state.isOpenModalEditAuthor &&
                    <ModalEditAuthor
                        isOpen={this.state.isOpenModalEditAuthor}

                        // isOpen={this.state.isOpenModalAuthor}
                        toggleFromParent={this.toggleAuthorEditModal}
                        currentAuthor={this.state.authorEdit}
                        // createNewAuthor={this.createNewAuthor}
                        editAuthor={this.doEditAuthor}
                    />
                }
                <div className='title text-center'>Quản lý tác giả</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewAuthor()}>
                        <i className="fas fa-plus px-1"></i>
                        Thêm tác giả
                    </button>
                </div>
                <div className='authors-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>Id</th>
                                <th>Tên</th>
                                <th>Ngày sinh</th>
                                <th>Quốc gia</th>
                                <th>Hoạt động</th>
                            </tr>
                            {arrAuthors && arrAuthors.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.birth_date}</td>
                                        <td>{item.nationality}</td>
                                        <td>
                                            <button><i className="fas fa-pencil-alt btn-edit" onClick={() => this.handleEditAuthor(item)}></i></button>
                                            <button><i className="fas fa-trash btn-delete" onClick={() => this.handleDeleteAuthor(item)}></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorManage);
