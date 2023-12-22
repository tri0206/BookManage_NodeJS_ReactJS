import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import './HomePage.scss';



class HomeHeader extends Component {
    handleLogoClick = () => {
        window.location.reload();
    };
    render() {

        return (
            <React.Fragment>

                <div className='HomeHeader'>
                    <div className='Header'>
                        <h1 onClick={this.handleLogoClick}>EDTech Book Service</h1>
                        <a href="/login">Đăng nhập tới trang quản trị</a>
                    </div>
                    <div className="banner">
                        <div className="text-container">
                            <h1>"Điều ta biết là giọt nước, điều ta chưa biết là đại dương"</h1>
                            <p>_Henry David Thoreau_</p>
                        </div>
                        {/* <div className="search-container">
                            <input type="text" placeholder="Tìm kiếm..." />
                            <button>Tìm kiếm</button>
                        </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
