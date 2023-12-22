import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import HomeFooter from './HomeFooter';
import { getAllBooks } from '../../services/bookService';
import './HomePage.scss'
import axios from 'axios';



class HomePage extends Component {
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
            <div>
                <HomeHeader />
                <HomeBody />
                <HomeFooter />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
