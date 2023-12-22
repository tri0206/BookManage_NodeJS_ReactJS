import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllBooks } from '../../services/bookService';
import axios from 'axios';


class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrBooks: [],
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
    render() {
        let arrBooks = this.state.arrBooks;
        return (
            <React.Fragment>

                <div>
                    <div className='bookList'>
                        <h1>Book List</h1>
                        <ul>
                            {arrBooks && arrBooks.map((item, index) => (
                                <li key={item.id}>
                                    <img src={`${item.bookImg}`} alt={item.title} />
                                    <p>{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.reader.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
