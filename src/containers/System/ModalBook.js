import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
class ModalBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            genre: '',
            publication_date: '',
            description: '',
            idAuthor: '',
            bookImg: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                title: '',
                genre: '',
                publication_date: '',
                description: '',
                idAuthor: '',
                bookImg: ''
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['title', 'genre', 'publication_date', 'description', 'idAuthor', 'bookImg'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewBook = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            this.props.createNewBook(this.state, 'abc');
        }
    }
    render() {
        console.log('check child props', this.props);
        console.log('check child open modal', this.props.isOpen);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-book-container'
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Thêm mới sách</ModalHeader>
                <ModalBody>

                    <div className='modal-book-body'>

                        <div className='input-container'>
                            <label>Tên sách</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "title") }}
                                value={this.state.title}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Thể loại</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "genre") }}
                                value={this.state.genre}
                            >

                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Ngày phát hành</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "publication_date") }}
                                value={this.state.publication_date}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Tác giả(id)</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "idAuthor") }}
                                value={this.state.idAuthor}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Ảnh minh họa</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "bookImg") }}
                                value={this.state.bookImg}
                            >
                            </input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Mô tả</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                                value={this.state.description}
                            >
                            </input>
                        </div>

                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewBook() }}>
                        Thêm
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalBook);





