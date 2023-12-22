import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ReaderManage from '../containers/System/ReaderManage';
// import ProductManage from '../containers/System/ProductManage';
import AuthorManage from '../containers/System/AuthorManage';
import BookManage from '../containers/System/BookManage';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/reader-manage" component={ReaderManage} />
                        <Route path="/system/author-manage" component={AuthorManage} />
                        <Route path="/system/book-manage" component={BookManage} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
