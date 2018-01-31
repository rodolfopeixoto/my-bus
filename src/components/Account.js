import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = (props, { authUser }) =>
    <div>
        <Navigation />
        <div className="container">
            <h1>Conta</h1>
            <p>Email: {authUser.email}</p>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    </div>

AccountPage.contextTypes = {
    authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);