import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const readerIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.reader.isLoggedIn,
    wrapperDisplayName: 'ReaderIsAuthenticated',
    redirectPath: '/login'
});

export const readerIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.reader.isLoggedIn,
    wrapperDisplayName: 'ReaderIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});