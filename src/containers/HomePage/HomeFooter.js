import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';




class HomeFooter extends Component {
    handleLogoClick = () => {
        window.location.reload();
    };
    render() {

        return (
            <React.Fragment>

                <div className="footer">
                    <p>&copy; 2023 Bookworms Inc.</p>
                    <div>
                        <a href="/about">About Us</a>
                        <a href="/contact">Contact Us</a>
                        <a href="/privacy">Privacy Policy</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
