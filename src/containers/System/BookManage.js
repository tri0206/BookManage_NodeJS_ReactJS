import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { getAllBooks, createNewBookService, deleteBookService, editBookService } from '../../services/BookService'
import { getAllBooks, createNewBookService, deleteBookService, editBookService } from '../../services/bookService';
import './BookManage.scss'
import ModalBook from './ModalBook';
import ModalEditBook from './ModalEditBook';
import { emitter } from "../../utils/emitter";
class BookManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBooks: [],
            isOpenModalBook: false,
            isOpenModalEditBook: false,
            bookEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllBooksFromReact();
    }
    getAllBooksFromReact = async () => {
        let response = await getAllBooks('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrBooks: response.books
            })

        }
    }
    handleAddNewBook = () => {
        this.setState({
            isOpenModalBook: true,
        })
    }

    toggleBookModal = () => {
        this.setState({
            isOpenModalBook: !this.state.isOpenModalBook,
        })
    }
    toggleBookEditModal = () => {
        this.setState({
            isOpenModalEditBook: !this.state.isOpenModalEditBook,
        })
    }
    createNewBook = async (data) => {
        try {
            let response = await createNewBookService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllBooksFromReact();
                this.setState({
                    isOpenModalBook: false
                })
                alert(response.message);
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteBook = async (book) => {
        try {
            let res = await deleteBookService(book.id);
            if (res && res.errCode === 0) {
                await this.getAllBooksFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditBook = (book) => {
        this.setState({
            isOpenModalEditBook: true,
            bookEdit: book
        })
    }
    doEditBook = async (book) => {
        try {

            let res = await editBookService(book);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditBook: false
                })
                alert(res.message);
                await this.getAllBooksFromReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        let arrBooks = this.state.arrBooks;
        return (
            <div className="books-container">
                <ModalBook
                    isOpen={this.state.isOpenModalBook}
                    toggleFromParent={this.toggleBookModal}
                    createNewBook={this.createNewBook}
                >
                </ModalBook>
                {this.state.isOpenModalEditBook &&
                    <ModalEditBook
                        isOpen={this.state.isOpenModalEditBook}

                        // isOpen={this.state.isOpenModalBook}
                        toggleFromParent={this.toggleBookEditModal}
                        currentBook={this.state.bookEdit}
                        // createNewBook={this.createNewBook}
                        editBook={this.doEditBook}
                    />
                }
                <div className='title text-center'>Quản lý sách</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewBook()}>
                        <i className="fas fa-plus px-1"></i>
                        Thêm mới sách
                    </button>
                </div>
                <div className='books-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>Id</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Thể loại</th>
                                <th>Ngày phát hành</th>
                                <th>Mô tả</th>
                                <th>Ảnh sách</th>
                                <th>Hoạt động</th>

                            </tr>
                            {arrBooks && arrBooks.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.Author.name}</td>
                                        <td>{item.genre}</td>
                                        <td>{item.publication_date}</td>
                                        <td>{item.description}</td>
                                        <td>{item.bookImg}</td>
                                        <td>
                                            <button><i className="fas fa-pencil-alt btn-edit" onClick={() => this.handleEditBook(item)}></i></button>
                                            <button><i className="fas fa-trash btn-delete" onClick={() => this.handleDeleteBook(item)}></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);
