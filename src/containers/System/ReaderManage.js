import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllReaders, createNewReaderService, deleteReaderService, editReaderService } from '../../services/readerService'
import './ReaderManage.scss'
import ModalReader from './ModalReader';
import ModalEditReader from './ModalEditReader';
import { emitter } from "../../utils/emitter";
class ReaderManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrReaders: [],
            isOpenModalReader: false,
            isOpenModalEditReader: false,
            readerEit: {}
        }
    }
    async componentDidMount() {
        await this.getAllReadersFromReact();
    }
    getAllReadersFromReact = async () => {
        let response = await getAllReaders('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrReaders: response.readers
            })

        }
    }
    handleAddNewReader = () => {
        this.setState({
            isOpenModalReader: true,
        })
    }

    toggleReaderModal = () => {
        this.setState({
            isOpenModalReader: !this.state.isOpenModalReader,
        })
    }
    toggleReaderEditModal = () => {
        this.setState({
            isOpenModalEditReader: !this.state.isOpenModalEditReader,
        })
    }
    createNewReader = async (data) => {
        try {
            let response = await createNewReaderService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllReadersFromReact();
                this.setState({
                    isOpenModalReader: false
                })
                alert(response.message);
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteReader = async (reader) => {
        try {
            let res = await deleteReaderService(reader.id);
            if (res && res.errCode === 0) {
                await this.getAllReadersFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditReader = (reader) => {
        this.setState({
            isOpenModalEditReader: true,
            readerEdit: reader
        })
    }
    doEditReader = async (reader) => {
        try {

            let res = await editReaderService(reader);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditReader: false
                })
                alert(res.message);
                await this.getAllReadersFromReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let arrReaders = this.state.arrReaders;
        return (
            <div className="readers-container">
                <ModalReader
                    isOpen={this.state.isOpenModalReader}
                    toggleFromParent={this.toggleReaderModal}
                    createNewReader={this.createNewReader}
                >
                </ModalReader>
                {this.state.isOpenModalEditReader &&
                    <ModalEditReader
                        isOpen={this.state.isOpenModalEditReader}

                        // isOpen={this.state.isOpenModalReader}
                        toggleFromParent={this.toggleReaderEditModal}
                        currentReader={this.state.readerEdit}
                        // createNewReader={this.createNewReader}
                        editReader={this.doEditReader}
                    />
                }
                <div className='title text-center'>Quản lý người đọc</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewReader()}>
                        <i className="fas fa-plus px-1"></i>
                        Thêm người đọc
                    </button>
                </div>
                <div className='readers-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Họ và tên</th>
                                <th>Hoạt động</th>
                            </tr>
                            {arrReaders && arrReaders.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <button><i className="fas fa-pencil-alt btn-edit" onClick={() => this.handleEditReader(item)}></i></button>
                                            <button><i className="fas fa-trash btn-delete" onClick={() => this.handleDeleteReader(item)}></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReaderManage);
