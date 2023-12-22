import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';
class ModalEditAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            name: ''
        }
    }
    componentDidMount() {
        let author = this.props.currentAuthor;
        if (author && !_.isEmpty(author)) {
            this.setState({
                id: author.id,
                name: author.name,
                birth_date: author.birth_date,
                nationality: author.nationality
            })
        }
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
        let arrInput = ['name', 'birth_date', 'nationality'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveAuthor = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            this.props.editAuthor(this.state);
        }
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-author-container'
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Sửa thông tin</ModalHeader>
                <ModalBody>

                    <div className='modal-author-body'>

                        <div className='input-container'>
                            <label>Tên</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "name") }}
                                value={this.state.name}
                            >
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Ngày sinh</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "birth_date") }}
                                value={this.state.birth_date}
                            >

                            </input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Quốc tịch</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "nationality") }}
                                value={this.state.nationality}
                            >

                            </input>
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveAuthor() }}>
                        Sửa đổi
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAuthor);





